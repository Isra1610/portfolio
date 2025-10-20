import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  console.log('Sending to Telegram...');
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    }, {
      timeout: 8000, 
    });

    console.log('Telegram message sent successfully', res);
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
};

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  const { name, email, message: userMessage } = payload;
  console.log('Sending email...');
  
  // Create transporter only when needed with timeout configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSKEY,
    },
    connectionTimeout: 5000,  
    greetingTimeout: 5000,   
    socketTimeout: 10000,    
  });
  
  const mailOptions = {
    from: "Portfolio", 
    to: process.env.EMAIL_ADDRESS, 
    subject: `New Message From ${name}`, 
    text: message, 
    html: generateEmailTemplate(name, email, userMessage), 
    replyTo: email, 
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return false;
  }
};

// Helper function to add timeout to promises
function withTimeout(promise, timeoutMs = 10000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ]);
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;

    // Validate input
    if (!name || !email || !userMessage) {
      return NextResponse.json({
        success: false,
        message: 'Name, email, and message are required.',
      }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;
    const emailAddress = process.env.EMAIL_ADDRESS;
    const gmailPasskey = process.env.GMAIL_PASSKEY;

    console.log('token:', token);
    console.log('chat_id:', chat_id);
    console.log('emailAddress:', emailAddress);
    console.log('gmailPasskey:', gmailPasskey);

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    let telegramSuccess = false;
    let emailSuccess = false;
    const results = [];

    // Try sending Telegram message (with timeout)
    if (token && chat_id) {
      try {
        telegramSuccess = await withTimeout(
          sendTelegramMessage(token, chat_id, message),
          9000  
        );
        if (telegramSuccess) {
          results.push('Telegram notification sent');
        }
      } catch (error) {
        console.error('Telegram Error:', error.message);
        results.push('Telegram failed: ' + error.message);
      }
    } else {
      console.log('Telegram not configured, skipping...');
    }

    // Try sending email (with timeout)
    if (emailAddress && gmailPasskey) {
      try {
        emailSuccess = await withTimeout(
          sendEmail(payload, message),
          12000  
        );
        if (emailSuccess) {
          results.push('Email sent');
        }
      } catch (error) {
        console.error('Email Error:', error.message);
        results.push('Email failed: ' + error.message);
      }
    } else {
      console.log('Email not configured, skipping...');
    }

    // Return success if at least one method succeeded
    if (telegramSuccess || emailSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!',
        details: results.join(', '),
      }, { status: 200 });
    }

    // If both failed or neither was configured, still return 200 but with a message
    return NextResponse.json({
      success: true,
      message: 'Message received. Note: Notification services may not be fully configured.',
      details: results.join(', '),
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred: ' + error.message,
    }, { status: 500 });
  }
};
