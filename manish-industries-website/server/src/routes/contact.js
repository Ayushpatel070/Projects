// /server/src/routes/contact.js
import express from "express";
import sgMail from "@sendgrid/mail";

const router = express.Router();

// Load API key from env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  const { name, phone, email, serviceRequested, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mail = {
    to: "apgamer2975@gmail.com", // where you want to receive submissions
    from: "yourverifiedemail@example.com", // must be verified in SendGrid
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Service Requested: ${serviceRequested || "N/A"}
      Message: ${message}
    `,
  };

  try {
    await sgMail.send(mail);
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("SendGrid error:", err.response?.body || err.message);
    res.status(500).json({ message: "Failed to send email" });
  }
});

export default router;
