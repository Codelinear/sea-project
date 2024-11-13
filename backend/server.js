const express = require("express");
const mariadb = require("mariadb");
const app = express();
const PORT = process.env.PORT || 5000;

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "search_engine_amplify",
  connectionLimit: 5,
});

app.use(express.json());

app.get("/api", async (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
