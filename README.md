# node-contact-form
A simple contact form using node.js and express

## Summary
This Node application receives a POST request containing a name, subject, email address, and message. It will connect to an smtp server and send an email with the given information. Note: The email address input into the form will be included in the body of the email message. Some email servers don't allow the sending of emails from another domain (due to spam). Make sure the from email address in the message matches the domain on your server.

## Installation and Setup
* Clone the given repository
* Run npm install to install the dependences
* Setup config.js to point to your smtp server
* Start the application (npm start)
* The application listens on port 8081 for a request to /contact (you may change this if it conflicts with your server setup)
* Request body should contain the following keys: name, subject, email, message
* If the request was successful (and an email was sent), it should return status 204

## Configuration
The config.js file contains settings related to your smtp server as well as default email body settings. Please make sure you change these in order for the application to work.

## Front-End
The front end needs to make POST request to the url MYDOMAIN:8081/contact. You may change this to suit your server setup. I will commit a simple front-end in the near future.

## Screenshots

Coming Soon!


## Built With
* HTML
* CSS
* JavaScript
* JQuery
* Node.js

## Dependencies
express
morgan
nodemailer

## Demo
https://nicera.in/contact.html

Note: While this contact form does protect your email address, it currently does not have any sort of anti-spam implemented.
