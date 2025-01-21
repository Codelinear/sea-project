const db = require("../db");
const express = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailjetClient = require("../mailjet");
const {
  sendContactFormEmail,
  sendSupportFormEmail,
} = require("../helpers/email");
const router = express.Router();
const RECAPTCHA_SECRET_KEY = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;

router.post("/submit_support_form", async (req, res) => {
  const { name, email, subject, issue, recaptchaToken } = req.body;

  if (!name || !email || !subject || !issue) {
    res.status(400).json({ message: "Required Form Fields Missing" });
  }
  if (!recaptchaToken) {
    return res.status(400).json({ message: "reCAPTCHA token is missing." });
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
  try {
    //console.log({ name, email, phone, message, recaptchaToken });
    const response = await fetch(verificationURL, { method: "POST" });
    //console.log(response);
    const verificationResult = await response.json();
    if (!verificationResult.success) {
      return res
        .status(400)
        .json({ message: "reCAPTCHA verification failed." });
    }

    // Proceed with form submission logic
    //console.log({ name, email, subject, issue, recaptchaToken });
    await sendSupportFormEmail(name, email, subject, issue);
    res.json({ status: "success", message: "Form submitted successfully." });
  } catch (error) {
    //console.error("Error verifying reCAPTCHA:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/submit_contact_form", async (req, res) => {
  const { name, email, message, phone, recaptchaToken } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "Required Form Fields Missing" });
  }
  if (!recaptchaToken) {
    return res.status(400).json({ message: "reCAPTCHA token is missing." });
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
  try {
    //console.log({ name, email, phone, message, recaptchaToken });
    const response = await fetch(verificationURL, { method: "POST" });
    //console.log(response);
    const verificationResult = await response.json();

    if (!verificationResult.success) {
      return res
        .status(400)
        .json({ message: "reCAPTCHA verification failed." });
    }

    // Proceed with form submission logic
    //console.log({ name, email, phone, message });
    await sendContactFormEmail(message, email, phone, name);
    res.json({ status: "success", message: "Form submitted successfully." });
  } catch (error) {
    //console.error("Error verifying reCAPTCHA:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/get_account", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization token required" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const [user] = await db.execute(
      "SELECT display_name, email FROM user WHERE id = ?",
      [decoded.id]
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  });
});

router.get("/get_subscriptions", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization token required" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const [user] = await db.execute(
      "SELECT s.*, pt.name AS 'product_tier_name', pt.billing_frequency AS 'billing_frequency',pt.credits AS 'credits_purchased',p.name AS 'product_name',p.description AS 'product_descirption' FROM subscription s, product_tier pt, product p WHERE s.user_id = ? AND pt.id = s.product_tier_id AND p.id = s.product_id ORDER BY s.id DESC",
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
  const trial_product_tier_id = 7;

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
      //Get the User
      const [user] = await db.execute(
        "SELECT u.display_name, s.product_id, s.product_tier_id, s.remaining_credits, s.id AS 'subscription_id' FROM user u, subscription s WHERE u.id = ? AND u.id = s.user_id AND s.status = 'active' ORDER BY s.start_date DESC LIMIT 1",
        [userId]
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "User Subscriptions not found" });
      }

      //ERROR IF USER'S CURRENT SUBSCRIPTION HAS NO MORE CREDITS
      if (user[0].remaining_credits <= 0) {
        console.error("insufficient credits");
        return res.status(400).json({ message: "Insufficient credits" });
      }

      // Error if user has made a request in the last 20 minutes
      const [recentSubmission] = await db.execute(
        "SELECT requested_at FROM content_wave_use WHERE subscription_id = ? AND requested_at > NOW() - INTERVAL 20 MINUTE ORDER BY requested_at DESC LIMIT 1",
        [user[0].subscription_id]
      );
      if (recentSubmission.length > 0) {
        const lastRequestedAt = new Date(recentSubmission[0].requested_at); // Convert to Date object
        const now = new Date();
        const minutesSinceLastRequest = Math.floor(
          (now - lastRequestedAt) / 60000
        ); // Difference in minutes
        const minutesRemaining = 20 - minutesSinceLastRequest; // Minutes left until 20 minutes are up
        if (minutesRemaining > 0) {
          return res.status(400).json({
            message: `You must wait ${minutesRemaining} minute(s) before submitting again.`,
          });
        }
      }

      const webhookResponse = await fetch(
        process.env.ZAPIER_CONTENT_WAVE_WEBHOOK,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country, topic, userId }),
        }
      );

      //MAKE RECORD OF CONTENT WAVE USE
      const recordContentWaveUse = await db.execute(
        "INSERT INTO content_wave_use (subscription_id, original_keyword, country_code) VALUES (? , ? , ?)",
        [user[0].subscription_id, topic, country]
      );
      if (recordContentWaveUse && recordContentWaveUse[0].affectedRows > 0) {
        console.log("CWU recorded successfully:", recordContentWaveUse);
      } else {
        console.error("Failed to record content wave use");
        return res
          .status(500)
          .json({ message: "Failed to record the content wave use" });
      }

      //DEDUCT CREDITS FROM USERs subscription
      var adjusted_credits = user[0].remaining_credits - 1;
      console.log(adjusted_credits);
      const updateCreditsAmount = await db.execute(
        "UPDATE subscription SET remaining_credits= ? WHERE id = ?",
        [adjusted_credits, user[0].subscription_id]
      );
      if (updateCreditsAmount && updateCreditsAmount[0].affectedRows > 0) {
        console.log("Credits updated successfully:");
        console.log(`Updated Subscription ID: ${user[0].subscription_id}`);
        console.log(`New Remaining Credits: ${adjusted_credits}`);
      } else {
        console.error("Failed to update credits.");
        return res
          .status(500)
          .json({ message: "Failed to update subscription credits" });
      }

      //If user reaches ZERO credits on a TRIAL TIER, expire the subscription
      if (
        adjusted_credits == 0 &&
        user[0].product_tier_id == trial_product_tier_id
      ) {
        const setAccountExpired = await db.execute(
          "UPDATE subscription SET status='expired',end_date=NOW() WHERE id = ?",
          [user[0].subscription_id]
        );
      }

      //MAKE RECORD IN TRANSACTION
      const recordTransaction = await db.execute(
        "INSERT INTO transaction (user_id,subscription_id,type,credits_changed) VALUES (? , ? , 'credit_usage', 1)",
        [userId, user[0].subscription_id]
      );
      if (recordTransaction && recordTransaction[0].affectedRows > 0) {
        console.log("Transaction recorded successfully:", recordTransaction);
      } else {
        console.error("Failed to record the transaction.");
        return res
          .status(500)
          .json({ message: "Failed to record the transaction" });
      }

      return res.status(200).json({ message: "Form submitted successfully!" });
    } catch (webhookError) {
      console.error("Webhook error:", webhookError.message);
      return res.status(500).json({ message: "Failed to submit form!" });
    }
  });
});

module.exports = router;
