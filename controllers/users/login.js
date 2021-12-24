const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const { SECRET_KEY } = process.env;

const sendEmail = require('../../utils/sendEmail');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const mail = {
    to: email,
    subject: 'Confirmation of registration',
    text: `Confirm registration. To do this, pass the <a target= "_blank"  href="http://localhoct:3000/users/verify/${user.verifyToken}">link</a>`,
    html: `<p>Confirm registration. To do this, pass the <a target= "_blank" href="http://localhoct:3000/users/verify/${user.verifyToken}">link</a></p>`,
  };

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized(`Email is wrong or password is wrong`);
  }

  if (!user.verify) {
    await sendEmail(mail);
    throw new Unauthorized(
      `You have not confirmed your registration. Check your email ${email} and follow the link in the letter.`,
    );
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: 'success',
    code: 200,
    message: 'user login',
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
