'use strict'

//=======================================================
// Includes and Global Variables
//=======================================================

//include express
const express = require('express');
const app = express();

//include nodemailer
const nodemailer = require('nodemailer');

//Include our mailer configuration
const {smtpConfig, messageDefaults, PORT} = require('./config');

//Include morgan for server logging
const morgan = require('morgan');

//log our http layer
app.use(morgan('common'));

//Use our json parser (this is required to parse req.body)
app.use(express.json());




//Setup our transporter object - This will contain the default smtp login as
//well as our default content that will be filled in if not supplied.
const transporter = nodemailer.createTransport(smtpConfig, messageDefaults);

// This handles all post requests sent to /contact.
// 1. It checks for all required fields submitted in our json request
// 2. It then builds our email headers and body.
// 3. It uses transporter to send the message using our defined smtp server
// 4. It returns 204 if the message was sent successfully (so that we may handle the response).
app.post('/contact', (req, res) =>{
    
    //Declare and check required fields
    const requiredFields = ['name', 'subject', 'message', 'email'];
    for(let i = 0; i < requiredFields.length; i++)
    {
        //Validate each field to determine if they are within our body
        if(!(requiredFields[i] in req.body)){
            const message = `Missing required field ${requiredFields[i]} in req body`;
            console.log(message);
            return res.status(400).send(message);
        }
    }

    //Build the message that we are going to send
    const message = {
        from: `${req.body.name} <noreply@nicera.in>`,
        subject: `${req.body.subject}`,
        text: `From: ${req.body.name}\n\nEmail: ${req.body.email}\n\nMessage: ${req.body.message}`,
        html: `<p><strong>From:</strong> ${req.body.name}</p><p><strong>Email:</strong> ${req.body.email}</p><p><strong>Message</strong>: ${req.body.message}</p>`
    };

    //call sendmail on our transporter and log our error
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return res.status(500).json({message: "internal server error"});
        }
    });

    return res.status(204).end();

});

//Allows us to store our server so that we may close it later
let server;

//Start our server
function runServer() {

  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
        .on('error', err => {
          reject(err);
        });
    });
}

// this function closes the server, and returns a promise.
function closeServer() {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

//Export our modules for testing
module.exports = { app, runServer, closeServer };