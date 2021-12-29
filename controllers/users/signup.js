const { User } = require('../../models');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { Conflict } = require('http-errors');
const { nanoid } = require('nanoid');
const sendEmail = require('../../utils/sendEmail');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userFind = await User.findOne({ email });
  const verifyToken = nanoid();

  if (userFind) {
    throw new Conflict(`Email ${email} in use`);
  }

  const avatarURL = gravatar.url(email, { protocol: 'http', s: '100' });

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await User.create({ name, email, password: hashPassword, avatarURL, verifyToken });

  const mail = {
    to: email,
    subject: 'Confirmation of registration',
    text: `Confirm registration. To do this, pass the <a target= "_blank"  href="http://localhoct:3000/users/verify/${verifyToken}">link</a>`,
    html: `<p>Confirm registration. To do this, pass the <a target= "_blank" href="http://localhoct:3000/users/verify/${verifyToken}">link</a></p>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'user created',
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL,
    },
  });
};

module.exports = signup;
