const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');

dotenv.config();

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mailingReg = (to, text, subject, html) => {
  const email = {
    to: 'wolova5409@xtrempro.com',
    from: EMAIL_FROM,
    text: 'Test ',
    subject: 'Test',
    html: '<p>Вам письмо<p>',
  };

  sgMail
    .send(email)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error(error);
    });
};
