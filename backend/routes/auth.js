const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const router = express.Router();

// Helper functions to create tokens
const createAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "User registration failed", error: err });
      }
      res.status(201).json({ message: "User registered successfully" });
    }
  );
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create tokens
      const accessToken = createAccessToken(user.id);
      const refreshToken = createRefreshToken(user.id);

      // Store refresh token in DB
      db.query(
        "UPDATE user SET refresh_token = ? WHERE id = ?",
        [refreshToken, user.id],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Token storage failed" });
          }

          res.json({ accessToken, refreshToken, message: "Login successful" });
        }
      );
    }
  );
});

// Token refresh route
router.post("/refresh-token", (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(401).json({ message: "Refresh token required" });

  db.query(
    "SELECT * FROM user WHERE refresh_token = ?",
    [token],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(403).json({ message: "Token verification failed" });

        const accessToken = createAccessToken(user.id);
        res.json({ accessToken });
      });
    }
  );
});

module.exports = router;
