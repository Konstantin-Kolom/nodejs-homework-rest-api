const { User } = require('../../models');
const { NotFound } = require('http-errors');

const verifyEmail = async (req, res) => {
  const { verifyToken } = req.params;

  const user = await User.findOne({ verifyToken });
  console.log(user);

  if (!user) {
    throw new NotFound('User not found');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
    user,
  });
};

module.exports = verifyEmail;
