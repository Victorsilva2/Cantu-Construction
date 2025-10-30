const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check if environment variables are set
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('Missing environment variables:', {
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASSWORD: !!process.env.SMTP_PASSWORD
    });
    return res.status(500).json({ message: "Server configuration error" });
  }

  const { name, email, phone, message } = req.body;

  // Trim any spaces from credentials (app passwords sometimes have spaces when copied)
  const smtpUser = process.env.SMTP_USER.trim();
  const smtpPass = process.env.SMTP_PASSWORD.trim();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    // Verify transporter setup
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    
    await transporter.sendMail({
      from: `"Website Contact" <${smtpUser}>`,
      to: smtpUser,
      subject: "New Client Inquiry",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${message}`,
    });

    console.log('Email sent successfully');
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error('Email sending error:', error.message);
    console.error('Full error:', error);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response);
    res.status(500).json({ 
      message: "Error sending email", 
      error: error.message,
      code: error.code 
    });
  }
}
