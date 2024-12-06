const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");

const app = express();
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// Handle uncaught errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
