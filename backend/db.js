const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "search_engine_amplify",
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    } else if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    } else if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    } else {
      console.error("Database connection error:", err.message);
    }
  }

  if (connection) connection.release();
  console.log("Connected to MySQL database via pool.");
});

module.exports = pool.promise();
