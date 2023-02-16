const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const quotes = require('./quotes.json');
const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


function sendEmail() {
    const auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: 'https://www.googleapis.com/auth/gmail.send'
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'app.test.test.88@gmail.com',
            clientId: '941003583424-tbipo66b1vgj2lh60oljll1mjfcfj5id.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: 'your-refresh-token',
            accessToken: 'your-access-token',
        },
    });

    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const mailOptions = {
        from: 'app.test.test.88@gmail.com',
        to: 'vinnyvilasboa@gmail.com',
        subject: 'Psychology Quote of the Day',
        text: quote.text,
        html: `<p>${quote.text}</p><p><a href="http://localhost:3000">${quote.author}</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}


function scheduleEmail() {
    sendEmail();
    setTimeout(scheduleEmail, 5 * 60 * 1000);
}

scheduleEmail();
