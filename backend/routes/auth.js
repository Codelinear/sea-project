const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Updated to use promise-based queries
const mailjetClient = require("../mailjet");
const { sendWelcomeEmail } = require("../helpers/email");
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

module.exports = router;
