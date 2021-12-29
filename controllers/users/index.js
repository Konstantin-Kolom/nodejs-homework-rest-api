const signup = require('./signup');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateAvatars = require('./updateAvatars');
const verifyEmail = require('./verifyEmail');
const reVerifyEmail = require('./reVerifyEmail');

module.exports = {
  signup,
  getCurrent,
  login,
  logout,
  updateSubscription,
  updateAvatars,
  verifyEmail,
  reVerifyEmail,
};
