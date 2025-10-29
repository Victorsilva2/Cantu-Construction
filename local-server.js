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

// Email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "glennquezada14@gmail.com",
    pass: "stpi faws wvve uane"
  },
});

// API endpoint for sending emails
app.post('/api/send', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await transporter.sendMail({
      from: `"Website Contact" <glennquezada14@gmail.com>`,
      to: "glennquezada14@gmail.com",
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
