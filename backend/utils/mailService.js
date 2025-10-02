// mailService.js
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendEmail(to, subject, name, link, password, fees) {
  const templatePath = path.join(process.cwd(), "utils", "temp.html");
  const source = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(source);

  const templateData = {
    name,
    link,
    password,
    fees,
    year: new Date().getFullYear(),
  };

  const html = template(templateData);

  const mailOptions = {
    from: `"Rb Live" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const data = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
    return data;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
}

module.exports = { sendEmail };
