const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
// const sgMail = require('@sendgrid/mail');

dotenv.config();

// const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;
const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

// sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: 'wolova5409@xtrempro.com',
//   from: EMAIL_FROM,
//   text: 'Test ',
//   subject: 'Test',
//   html: '<p>Вам письмо<p>',
// };

// sgMail
//   .send(email)
//   .then(() => {
//     console.log('Email sent');
//   })
//   .catch(error => {
//     console.error(error);
//   });

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('publiс'));

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = `Server error. ${err.message}` } = err;
  res.status(status).json({
    status: 'error',
    code: status,
    message: err.message,
  });
});

module.exports = app;
