const jwt_decode = require('jwt-decode');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const { cookies } = req;
  const session = cookies['next-auth.session-token'];

  if (!session) {
    console.log('no session token');
    return res.status(401).send('unauthorized');
  }

  const decoded = jwt_decode(session);
  const user = await User.findOne({
    usernameLowerCase: decoded.name.toLowerCase(),
  });

  if (!user) {
    return res.status(400).send('user not found');
  }

  req.currentUser = user;
  return next();
};
