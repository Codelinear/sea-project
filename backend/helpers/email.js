const mailjetClient = require("../mailjet");

const sendWelcomeEmail = async (toEmail, fullName, confirmationToken) => {
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
              Name: fullName || "User",
            },
          ],
          Subject: "Welcome to Our Service!",
          TextPart: `Hi ${fullName}, welcome! Please confirm your email using this link: ${confirmationLink}`,
          HTMLPart: `<p>Hi <strong>${fullName}</strong>, welcome! Please confirm your email using the link below:</p>
                     <a href="${confirmationLink}">Confirm Email</a><br><br>Thank you!<br><br>-The Search Engine Amplify Team`,
        },
      ],
    });

    console.log("Welcome email sent:", request.body);
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
    throw new Error("Failed to send welcome email");
  }
};

const sendSupportFormEmail = async (name, email, subject, issue) => {

  try{
    //console.log(message);
    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "no-reply@searchengineamplify.com", // Update with your sender email
            Name: "Support - Search Engine Amplify", // Update with your sender name
          },
          To: [
            {
              Email: "support@searchengineamplify.com",
              Name: "Support Form Submitted",
            },
          ],
          Subject: "New Support Form Submitted",
          TextPart: `A new Support Form has been submitted!`,
          HTMLPart: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Issue:</strong> ${issue}</p>`,
        },
      ],
    });
    console.log("Contact Form Email Sent :", request.body);
  }
  catch(error){
    throw new Error("Failed to send contact form email");
  }

};

const sendContactFormEmail = async (message, email, phone, name) => {

  try{
    console.log(message);
    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "no-reply@searchengineamplify.com", // Update with your sender email
            Name: "Contact - Search Engine Amplify", // Update with your sender name
          },
          To: [
            {
              Email: "contact@searchengineamplify.com",
              Name: "Contact Form Submitted",
            },
          ],
          Subject: "New Contact Form Submitted",
          TextPart: `A new Contact Form has been submitted!`,
          HTMLPart: `<p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
        },
      ],
    });
    console.log("Contact Form Email Sent :", request.body);
  }
  catch(error){
    throw new Error("Failed to send contact form email");
  }

};

const sendPasswordResetEmail = async (toEmail, resetLink) => {
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
              Name: "User",
            },
          ],
          Subject: "Password Reset Request",
          TextPart: `We received a request to reset your password. Click the link below to reset it:
  ${resetLink}
  
  If you did not request this, please ignore this message.`,
          HTMLPart: `
              <p>We received a request to reset your password. Click the link below to reset it:</p>
              <p><a href="${resetLink}">${resetLink}</a></p>
              <p>If you did not request this, please ignore this message.<br><br>Thank you!<br><br>-The Search Engine Amplify Team</p>
            `,
        },
      ],
    });

    console.log("Password reset email sent:", request.body);
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    throw new Error("Failed to send password reset email");
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendContactFormEmail,
  sendSupportFormEmail
};
