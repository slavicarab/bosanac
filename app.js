const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const { redirect } = require('express/lib/response');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root Route - Serve the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'forma_bosanac.html'));
});

app.get('/danke', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'danke.html'));
});

// Backend Route - Handle form submission
app.post('/submit', async (req, res) => {
  const { userNameVal,userEmailVal,userAddressVal,goalAddressVal, userFloorVal, goalFloorVal,categoryVal, moveTypeVal, moveDateVal} = req.body;

  if (!userNameVal || !userEmailVal || !userAddressVal || !goalAddressVal ) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

  try {
    // Set up Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 25,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: userEmailVal,
      to: 'office@furst.at', // Replace with recipient email
      cc: 'slavicarabrenovic@yahoo.com',
      subject: `Nachricht von ${userNameVal}`,
      text: `Name: ${userNameVal}\nEmail: ${userEmailVal}\nAuszug - Adresse: ${userAddressVal}\nStock: ${userFloorVal}\nEinzug - Adresse: ${goalAddressVal}\nStock: ${goalFloorVal}\nKategorie: ${categoryVal}\nUmzug: ${moveTypeVal}\nUmzug Datum: ${moveDateVal}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ redirect: '/danke'});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to send email. Try again later.' });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
