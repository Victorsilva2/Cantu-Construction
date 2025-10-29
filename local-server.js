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

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "New Client Inquiry",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${message}`,
    });

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
