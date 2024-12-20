const mailjetClient = require("../mailjet");

const sendWelcomeEmail = async (toEmail, username, confirmationToken) => {
  const confirmationLink = `${process.env.FRONTEND_URL}/confirm-email?token=${confirmationToken}`;

  try {
    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "no-reply@searchengineamplify.com", // Update with your sender email
            Name: "Search Engine Amplify", // Update with your sender name
          },
          To: [
            {
              Email: toEmail,
              Name: username || "User",
            },
          ],
          Subject: "Welcome to Our Service!",
          TextPart: `Hi ${username}, welcome! Please confirm your email using this link: ${confirmationLink}`,
          HTMLPart: `<p>Hi <strong>${username}</strong>, welcome! Please confirm your email using the link below:</p>
                     <a href="${confirmationLink}">Confirm Email</a>`,
        },
      ],
    });

    console.log("Welcome email sent:", request.body);
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
    throw new Error("Failed to send welcome email");
  }
};

module.exports = {
  sendWelcomeEmail,
};
