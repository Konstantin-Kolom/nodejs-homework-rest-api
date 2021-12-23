const { User } = require('../../models');
const { NotFound } = require('http-errors');
const res = require('express/lib/response');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFound('User not found');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });
};

res.status(200).json({
  status: 'success',
  code: 200,
  message: 'Verification successful',
});

module.exports = verifyEmail;
