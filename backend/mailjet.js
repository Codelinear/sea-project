require("dotenv").config();
const mailjet = require("node-mailjet");

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

module.exports = mailjetClient;
