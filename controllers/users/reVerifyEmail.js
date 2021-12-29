const { User } = require('../../models');
const { BadRequest } = require('http-errors');

const sendEmail = require('../../utils/sendEmail');

const reVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest('missing required field email');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest('User not found.');
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Confirmation of registration',
    text: `Confirm registration. To do this, pass the <a target= "_blank"  href="http://localhoct:3000/users/verify/${user.verifyToken}">link</a>`,
    html: `<p>Confirm registration. To do this, pass the <a target= "_blank" href="http://localhoct:3000/users/verify/${user.verifyToken}">link</a></p>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
    email: email,
  });
};

module.exports = reVerifyEmail;
