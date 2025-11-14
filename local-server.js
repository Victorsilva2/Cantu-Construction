require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
// Serve static files from current directory (Cantu-Construction)
app.use(express.static(__dirname));

// Validate environment variables
if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
  console.error('❌ Error: SMTP_USER and SMTP_PASSWORD must be set in .env file');
  process.exit(1);
}

// Email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
});

// API endpoint for sending emails
app.post('/api/send', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Email 1: Send inquiry to business
    const businessEmail = {
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "New Client Inquiry",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${message}`,
      html: `
        <h3 style="color: #000080;">New Inquiry from Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    // Email 2: Auto-generated confirmation email to customer
    const customerEmail = {
      from: `"Cantu Construction" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Cantu Construction – Inquiry Received",
      text: `Hello,\n\nThank you for your inquiry.\nYour message has been successfully received by our team at Cantu Construction.\n\nA representative will review the details and follow up with you shortly regarding next steps, timelines, or any additional information needed.\n\nWe appreciate your interest in working with us and look forward to the opportunity to discuss your project.\n\nSincerely,\nCantu Construction`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">Hello,</p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              Thank you for your inquiry.<br>
              Your message has been successfully received by our team at Cantu Construction.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              A representative will review the details and follow up with you shortly regarding next steps, timelines, or any additional information needed.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              We appreciate your interest in working with us and look forward to the opportunity to discuss your project.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-top: 30px;">
              Sincerely,<br>
              <strong style="color: #000080;">Cantu Construction</strong>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessEmail),
      transporter.sendMail(customerEmail)
    ]);

    console.log('Emails sent successfully');
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: "Error sending email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Email functionality is enabled!');
});
