// index.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-email', async (req, res) => {
  const { name, email, phone, orderNumber, purchaseDate, productName, productSKU, quantity, reason, condition, action, comments, returnAddress, shippingMethod, agree } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New RMA Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Order Number: ${orderNumber}
      Purchase Date: ${purchaseDate}
      Product Name: ${productName}
      Product SKU: ${productSKU}
      Quantity: ${quantity}
      Reason: ${reason}
      Condition: ${condition}
      Action: ${action}
      Comments: ${comments}
      Return Address: ${returnAddress}
      Shipping Method: ${shippingMethod}
      Agree: ${agree}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

app.post('/quick-enquiry', async (req, res) => {
  const { fullName, email, mobile, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Quick Enquiry',
    text: `
      Full Name: ${fullName}
      Email: ${email}
      Mobile: ${mobile}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

app.post('/contact', async (req, res) => {
  const { firstName, lastName, company, email, country, phoneNumber, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Company: ${company}
      Email: ${email}
      Country: ${country}
      Phone Number: ${phoneNumber}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
