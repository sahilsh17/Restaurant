require('dotenv').config();
const express = require('express');
const router  = express.Router();
const { utcTimeChange } = require('../public/scripts/helpers');

// For SMS API
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

let templateVars;
let textSent = false;
let orderReceived = false;

// When the restaurant responds, this page is loaded
// with the restaurant response. It then sends a txt to the client as well.
router.get("/smsReceive", (req, res) => {
  if (!templateVars) {
    // Renders orderconfirmation page if response from restaurant has not been sent yet
    res.render("orderNotReady")
  } else {
      if (textSent === false) {
      textSent = true;
      const from = '16045952801';
      const to = '16472861763';
      const text = `Hello from Mamma Mia's! We hope you're hungry: ${templateVars.text}. Sent at ${templateVars.timeStamp}`;
      // Nexmo Sends the sms
      nexmo.message.sendSms(from, to, text);
    }
    res.render("smsReceive", templateVars);
  }
});

// This is the response from the webhook url when the restaurant responds via SMS
router.post("/smsReceive", (req, res) => {
  const params = Object.assign(req.body)
  const text = params.text;
  const UTCDateTime = params['message-timestamp'];
  // Convert to local time
  const timeStamp = utcTimeChange(UTCDateTime, "Europe/London", "America/Vancouver");
  orderReceived = true;
  templateVars = { text, timeStamp, orderReceived };
  res.render("smsReceive", templateVars);
  res.status(200).send()
});

// Sends delivery status to Nexmo otherwise it will keep retrying
router.post("/delivery", (req, res) => {
  res.status(200).send('received msg');
});

module.exports = router;
