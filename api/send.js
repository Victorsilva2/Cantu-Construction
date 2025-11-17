const sgMail = require("@sendgrid/mail");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check if environment variables are set
  if (!process.env.SEND_GRID_API_KEY) {
    console.error('Missing SendGrid API key');
    return res.status(500).json({ message: "Server configuration error: Missing SendGrid API key" });
  }

  // Set SendGrid API key
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  const { name, email, phone, message } = req.body;

  try {
    // Email 1: Send inquiry to business
    const businessMsg = {
      to: "clarissaf@cantuconstruction.com", // Recipient
      from: "clarissaf@cantuconstruction.com", // Verified sender in SendGrid
      subject: "New Inquiry from Cantu Construction Website",
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
    const customerMsg = {
      to: email, // Customer's email
      from: "clarissaf@cantuconstruction.com", // Verified sender in SendGrid
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
      sgMail.send(businessMsg),
      sgMail.send(customerMsg)
    ]);
    
    console.log('Emails sent successfully via SendGrid');
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error('SendGrid error:', error.message);
    console.error('Full error:', error);
    if (error.response) {
      console.error('Error details:', JSON.stringify(error.response.body, null, 2));
    }
    res.status(500).json({ 
      message: "Error sending email",
      error: error.message
    });
  }
}
