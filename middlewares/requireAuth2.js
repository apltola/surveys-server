const jwt_decode = require('jwt-decode');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const { authorization } = req.headers;
  console.log('auth header ', authorization);
  if (!authorization || !authorization.includes('Bearer')) {
    return res.status(401).send('unauthorized');
  }

  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt_decode(token);
    console.log('jeejee? ', decoded);
    const user = await User.findOne({
      usernameLowerCase: decoded.name.toLowerCase(),
    });

    if (!user) {
      return res.status(400).send('user not found');
    }

    req.currentUser = user;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error...');
  }
};
