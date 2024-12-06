const db = require("../db");
const express = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/get_account", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization token required" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const [user] = await db.execute(
      "SELECT display_name, email, trial_credits FROM user WHERE id = ?",
      [decoded.id]
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  });
});

router.post("/set_name", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization token required" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    try {
      const [result] = await db.execute(
        "UPDATE user SET display_name = ? WHERE id = ?",
        [name, decoded.id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "User not found" });

      res.json({ message: "Name updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

router.post("/set_email", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization token required" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const { email } = req.body;
    if (!email || !email.includes("@"))
      return res.status(400).json({ message: "Valid email is required" });

    try {
      const [result] = await db.execute(
        "UPDATE user SET email = ? WHERE id = ?",
        [email, decoded.id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "User not found" });

      res.json({ message: "Email updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

router.post("/submit_topic_form", async (req, res) => {
  const { country, topic } = req.body;
  const authHeader = req.headers.authorization;

  // Validate token
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const userId = decoded.id;
    // Process form data
    try {
      const webhookResponse = await fetch(
        "https://hooks.zapier.com/hooks/catch/20672280/2iv2w5c/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country, topic, userId }),
        }
      );

      return res.status(200).json({ message: "Form submitted successfully!" });
    } catch (webhookError) {
      console.error("Webhook error:", webhookError.message);
      return res.status(500).json({ message: "Failed to submit form!" });
    }
  });
});

module.exports = router;
