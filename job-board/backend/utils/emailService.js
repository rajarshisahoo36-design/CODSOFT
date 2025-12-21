const nodemailer = require('nodemailer');

// Simple wrapper to send emails. 
// In a real prod app, I'd use SendGrid, but Nodemailer is fine for this MVP.
const sendEmail = async (options) => {
  // Creating a transporter. 
  // TIP: Use Mailtrap for testing so you don't spam real emails while developing.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Job Board System <no-reply@jobboard.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html: options.html // TODO: Add HTML templates later for prettier emails
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;