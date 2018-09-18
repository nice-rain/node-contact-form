'use strict'

//Configure our smtp object
const smtpConfig = {
    host: "REPLACE_WITH_SMTP_URL",
    port: REPLACE_WITH_SMTP_PORT,
    secure: false, //use tls
    requireTLS: true,
    auth: {
        user: 'REPLACE_WITH_USERNAME',
        pass: 'REPLACE_WITH_PASSWORD'
    },
    logger: false,
    debug: false // include SMTP traffic in the logs
};

//Configure defaults that will be attached to each method
const messageDefaults = {
    to: 'REPLACE_WITH_RECIPIENT_EMAIL' //email our contact form is sending to
};

module.exports = {smtpConfig, messageDefaults};
module.exports.PORT = process.env.PORT || 8081; //server port we are listening on