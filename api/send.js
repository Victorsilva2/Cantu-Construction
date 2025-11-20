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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #000080; font-size: 24px; margin-bottom: 25px; border-bottom: 2px solid #000080; padding-bottom: 10px;">New Inquiry from Website</h3>
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 15px;"><strong>Name:</strong> ${name}</p>
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #000080; text-decoration: none;">${email}</a></p>
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 15px;"><strong>Phone:</strong> ${phone ? `<a href="tel:${phone.replace(/\D/g, '')}" style="color: #000080; text-decoration: none;">${phone}</a>` : 'Not provided'}</p>
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 10px;"><strong>Message:</strong></p>
            <p style="color: #333; font-size: 16px; line-height: 1.8; white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 3px solid #000080;">${message}</p>
          </div>
        </div>
      `,
    };

    // Email 2: Auto-generated confirmation email to customer
    const customerMsg = {
      to: email, // Customer's email
      from: "clarissaf@cantuconstruction.com", // Verified sender in SendGrid
      subject: "Cantu Construction – Inquiry Received",
      text: `Hello,\n\nThank you for your inquiry.\nYour message has been successfully received by our team at Cantu Construction.\n\nA representative will review the details and follow up with you shortly regarding next steps, timelines, or any additional information needed.\n\nWe appreciate your interest in working with us and look forward to the opportunity to discuss your project.\n\nSincerely,\nCantu Construction\n\n5221 N. McColl Rd. McAllen, Texas, 78504\n(956) 631-1273\nsales@cantuconstruction.com`,
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
            
            <p style="color: #333; font-size: 16px; line-height: 1.8; margin-top: 40px; margin-bottom: 10px;">
              Sincerely,<br>
              <strong style="color: #000080;">Cantu Construction</strong>
            </p>
            
            <!-- Email Footer -->
            <div style="border-top: 2px solid #f0f0f0; margin-top: 40px; padding-top: 30px; text-align: center;">
              <div style="color: #666; font-size: 14px; line-height: 1.8;">
                <p style="margin: 5px 0; color: #333;">
                  <strong style="color: #000080;">Cantu Construction</strong>
                </p>
                <p style="margin: 5px 0;">
                  <a href="https://www.google.com/maps/place/5221+N+McColl+Rd,+McAllen,+TX+78504/@26.2483202,-98.208048,16z" style="color: #666; text-decoration: none;">5221 N. McColl Rd. McAllen, Texas, 78504</a>
                </p>
                <p style="margin: 5px 0;">
                  <a href="tel:9566311273" style="color: #666; text-decoration: none;">(956) 631-1273</a>
                </p>
                <p style="margin: 5px 0;">
                  <a href="mailto:sales@cantuconstruction.com" style="color: #666; text-decoration: none;">sales@cantuconstruction.com</a>
                </p>
              </div>
            </div>
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
