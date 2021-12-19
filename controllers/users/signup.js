const { User } = require('../../models');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { Conflict } = require('http-errors');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userFind = await User.findOne({ email });

  if (userFind) {
    throw new Conflict(`Email ${email} in use`);
  }

  const avatarURL = gravatar.url(email, { protocol: 'http', s: '100' });

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await User.create({ name, email, password: hashPassword, avatarURL });

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
