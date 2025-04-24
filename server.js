const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const path = require('path');

const app = express();

// ✅ Enable CORS for GitHub Pages
app.use(cors({ origin: "https://RikardGjomarkaj.github.io" })); // Replace with your GitHub Pages URL

// ✅ Middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Serve static files from 'public' folder
app.use(express.static('public'));

// // ✅ Serve index.html correctly
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the HTML file
// });

// Redirect to GitHub Pages where your index.html is hosted
app.get('/', (req, res) => {
  res.redirect('https://RikardGjomarkaj.github.io/Hydraulicparts2front/');
});


// ✅ Secure Email Configuration using Environment Variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'presionituba@gmail.com', // Use environment variable
    pass: 'vicv gucj jntp mqfd', // Use environment variable
  },
});

// ✅ Contact Form Route
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'g.emajl001@gmail.com', // Receiver email from environment variables
    subject: `Contact form submission from ${name}`,
    text: `You have received a message from ${name} (${email}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Error sending email" });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  });
});

// ✅ Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
