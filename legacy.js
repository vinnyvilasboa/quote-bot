const cron = require('node-cron');
const http = require('http');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// Set up OAuth 2.0 client
const credentials = require('./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');
const oAuth2Client = new google.auth.OAuth2(
  credentials.installed.client_id,
  credentials.installed.client_secret,
  credentials.installed.redirect_uris[0]
);
oAuth2Client.setCredentials({
  refresh_token: credentials.installed.refresh_token
});


const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'app.test.test.88@gmail.com',
      clientId: credentials.installed.client_id,
      clientSecret: credentials.installed.client_secret,
      refreshToken: credentials.installed.refresh_token,
      accessToken: oAuth2Client.getAccessToken(),
    },
  });

//all quotes or database here
function formatQuote() {
    const quotes = [
        "Compare yourself to who you were yesterday, not to who someone else is today.",
        "Stand up straight with your shoulders back.",
        "Set your house in perfect order before you criticize the world.",
        "Treat yourself like someone you are responsible for helping.",
        "Pursue what is meaningful (not what is expedient).",
        "Tell the truth — or, at least, don't lie.",
        "Assume that the person you are listening to might know something you don't.",
        "Be precise in your speech.",
        "Do not bother children when they are skateboarding.",
        "Pet a cat when you encounter one on the street."
      ];
      
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const message = {
        from: 'app.test.test.88@gmail.com',
        to: 'vinnycesca@gmail.com',
        subject: 'Daily Pyschology Quotes',
        text: randomQuote
    }


    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email send: ' + info.response)
        }
    })
    
    
}

    // Set up timer to call formatQuote() every 5 minutes
    setInterval(formatQuote, 5 * 60 * 1000)


    // Schedule bot to run daily at 8am
    cron.schedule('34 14 * * *', () => {
        formatQuote();
    });


