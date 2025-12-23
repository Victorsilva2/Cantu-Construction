const sgMail = require("@sendgrid/mail");

// Simple in-memory rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS_PER_IP = 3; // Max 3 submissions per 15 minutes per IP

// Helper function to get client IP
function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         'unknown';
}

// Rate limiting check
function checkRateLimit(ip) {
  const now = Date.now();
  const key = `rate_limit_${ip}`;
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  const limit = rateLimitStore.get(key);
  
  // Reset if window expired
  if (now > limit.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  // Check if limit exceeded
  if (limit.count >= MAX_SUBMISSIONS_PER_IP) {
    return false;
  }
  
  // Increment count
  limit.count++;
  return true;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 1000); // Clean up every minute

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check if environment variables are set
  if (!process.env.SEND_GRID_API_KEY) {
    console.error('Missing SendGrid API key');
    return res.status(500).json({ message: "Server configuration error: Missing SendGrid API key" });
  }

  // Get client IP for rate limiting
  const clientIP = getClientIP(req);
  
  // Rate limiting check
  if (!checkRateLimit(clientIP)) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return res.status(429).json({ 
      message: "Too many requests. Please try again later." 
    });
  }

  // Set SendGrid API key
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  const { name, email, phone, message, website, url, formLoadTime, submitTime } = req.body;

  // Bot Detection: Honeypot field check (check both honeypot fields)
  // If either honeypot field is filled, it's definitely a bot
  if ((website && website.trim() !== '') || (url && url.trim() !== '')) {
    console.warn(`🚫 BOT BLOCKED (honeypot filled) from IP: ${clientIP}`, {
      website: website || '(empty)',
      url: url || '(empty)',
      email: email || '(no email)',
      name: name || '(no name)'
    });
    // Return generic error - don't reveal it's a honeypot
    return res.status(400).json({ 
      message: "Invalid submission detected." 
    });
  }

  // Bot Detection: Time-based validation
  if (formLoadTime && submitTime) {
    const loadTime = parseInt(formLoadTime);
    const submitTimeInt = parseInt(submitTime);
    
    if (!isNaN(loadTime) && !isNaN(submitTimeInt)) {
      const timeSpent = (submitTimeInt - loadTime) / 1000; // in seconds
      
      // If form was submitted in less than 3 seconds, it's likely a bot
      if (timeSpent < 3) {
        console.warn(`Bot detected (too fast: ${timeSpent.toFixed(2)}s) from IP: ${clientIP}`);
        return res.status(400).json({ 
          message: "Form submitted too quickly. Please take your time." 
        });
      }
      
      // If form was submitted in less than 5 seconds, log as suspicious but allow
      if (timeSpent < 5) {
        console.warn(`Suspicious submission (${timeSpent.toFixed(2)}s) from IP: ${clientIP}`);
      }
    }
  }

  // Additional spam detection: Check for common spam patterns
  const spamPatterns = [
    /(viagra|cialis|casino|poker|loan|debt|credit)/i,
    /(http|https|www\.)/i, // URLs in message (often spam)
    /(click here|buy now|limited time)/i
  ];
  
  const messageText = (message || '').toLowerCase();
  const nameText = (name || '').toLowerCase();
  const emailText = (email || '').toLowerCase();
  
  // Check message for spam patterns (but allow legitimate URLs in context)
  const suspiciousPatterns = spamPatterns.filter(pattern => {
    if (pattern.source.includes('http')) {
      // Only flag if URL is standalone or suspicious
      return pattern.test(messageText) && !messageText.includes('cantuconstruction.com');
    }
    return pattern.test(messageText) || pattern.test(nameText) || pattern.test(emailText);
  });
  
  if (suspiciousPatterns.length > 0) {
    console.warn(`Suspicious content detected from IP: ${clientIP}`, suspiciousPatterns);
    // Log but don't block - might be false positive
  }

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      message: "Please fill in all required fields." 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: "Please provide a valid email address." 
    });
  }

  // Additional spam detection: Check for suspicious email patterns
  // Random letter emails (like "abc@xyz.com", "test@test.com", etc.)
  const suspiciousEmailPatterns = [
    /^[a-z]{1,3}@[a-z]{1,3}\.[a-z]{2,3}$/i, // Very short emails like "ab@cd.ef"
    /^test@/i, // test@ emails
    /^[a-z]+\d+@/i, // Random letters + numbers like "abc123@"
    /@(test|example|fake|spam|temp)\./i, // Test domains
    /@(mailinator|10minutemail|guerrillamail|tempmail)\./i, // Temporary email services
  ];
  
  const isSuspiciousEmail = suspiciousEmailPatterns.some(pattern => pattern.test(email));
  if (isSuspiciousEmail) {
    console.warn(`🚫 Suspicious email pattern detected from IP: ${clientIP}`, { email, name });
    // Log but allow - might be legitimate, but log for review
  }

  // Check for random letter names (very short or random character patterns)
  if (name && name.trim().length < 2) {
    return res.status(400).json({ 
      message: "Name must be at least 2 characters long." 
    });
  }
  
  // Check for suspicious name patterns (random letters, numbers, etc.)
  const suspiciousNamePatterns = [
    /^[a-z]{1,2}$/i, // Single or double letter names
    /^[a-z]+\d+$/i, // Random letters + numbers
    /^(test|admin|user|spam)$/i, // Common test names
  ];
  
  const isSuspiciousName = suspiciousNamePatterns.some(pattern => pattern.test(name));
  if (isSuspiciousName) {
    console.warn(`🚫 Suspicious name pattern detected from IP: ${clientIP}`, { name, email });
  }

  // Validate message length (too short might be spam, too long might be abuse)
  if (message.trim().length < 10) {
    return res.status(400).json({ 
      message: "Message must be at least 10 characters long." 
    });
  }
  
  if (message.trim().length > 5000) {
    return res.status(400).json({ 
      message: "Message is too long. Please keep it under 5000 characters." 
    });
  }

  // Check for random letter messages (common spam pattern)
  // Messages that are just random letters or very repetitive
  const messageText = message.trim();
  const isRandomLetters = /^[a-z\s]{1,20}$/i.test(messageText) && messageText.length < 20;
  const isRepetitive = /^(.)\1{10,}$/.test(messageText); // Same character repeated
  
  if (isRandomLetters || isRepetitive) {
    console.warn(`🚫 Suspicious message pattern (random letters/repetitive) from IP: ${clientIP}`, {
      email,
      name,
      messageLength: messageText.length,
      messagePreview: messageText.substring(0, 50)
    });
    return res.status(400).json({ 
      message: "Message appears to be invalid. Please provide a meaningful message." 
    });
  }

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
