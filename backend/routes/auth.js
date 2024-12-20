const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Updated to use promise-based queries
const mailjetClient = require("../mailjet");
const {
  sendWelcomeEmail,
  sendPasswordResetEmail,
} = require("../helpers/email");
require("dotenv").config();

const router = express.Router();

// Helper functions
const createAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });

const createRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    // Generate email confirmation token
    const confirmationToken = jwt.sign(
      { id: result.insertId },
      process.env.EMAIL_CONFIRM_SECRET
    );

    await sendWelcomeEmail(email, username, confirmationToken);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res
      .status(500)
      .json({ message: "User registration failed", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    if (user.email_is_verified !== 1) {
      return res.status(401).json({ message: "User Email Not Verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    await db.execute("UPDATE user SET refresh_token = ? WHERE id = ?", [
      refreshToken,
      user.id,
    ]);

    res.json({ accessToken, refreshToken, message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// Refresh token route
router.post("/refresh-token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const [rows] = await db.execute(
      "SELECT * FROM user WHERE refresh_token = ?",
      [token]
    );
    if (rows.length === 0) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = rows[0];
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token verification failed" });
      }

      const accessToken = createAccessToken(user.id);
      res.json({ accessToken });
    });
  } catch (err) {
    console.error("Error refreshing token:", err);
    res
      .status(500)
      .json({ message: "Failed to refresh token", error: err.message });
  }
});

// Confirm Email
router.post("/confirm-email", async (req, res) => {
  const { token } = req.body; // Extract the token from the request body

  if (!token) {
    return res.status(400).json({ message: "Confirmation token is required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.EMAIL_CONFIRM_SECRET);

    // Update the user's email verification status
    await db.execute("UPDATE user SET email_is_verified = TRUE WHERE id = ?", [
      decoded.id,
    ]);

    res.status(200).json({ message: "Email confirmed successfully!" });
  } catch (err) {
    console.error("Email confirmation error:", err);
    res.status(400).json({ message: "Invalid or expired confirmation token" });
  }
});

// Password Reset Request
router.post("/reset-password-request", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const user = rows[0];

    // Generate a reset token (JWT)
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "1h" }
    );

    // Set the expiry time for the reset token (e.g., 1 hour from now)
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Update the user record with the reset token and expiry time
    await db.execute(
      "UPDATE user SET reset_token = ?, reset_token_expiry = ? WHERE id = ?",
      [resetToken, resetTokenExpiry, user.id]
    );

    // Send the reset token to the user's email (you'll need to customize this)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (err) {
    console.error("Error during password reset request:", err);
    res.status(500).json({
      message: "Failed to send password reset link",
      error: err.message,
    });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  }

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const [rows] = await db.execute("SELECT * FROM user WHERE id = ?", [
      decoded.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // Check if the reset token has expired
    if (user.reset_token_expiry < Date.now()) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    // Check if the token matches the one in the database
    if (user.reset_token !== token) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await db.execute(
      "UPDATE user SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error during password reset:", err);
    res
      .status(500)
      .json({ message: "Failed to reset password", error: err.message });
  }
});

module.exports = router;
