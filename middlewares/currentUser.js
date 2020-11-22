const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (!req.session) {
    return next();
  }

  if (!req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET);

    req.currentUser = payload;
    console.log('middleware currentuser', req.currentUser);
  } catch (error) {
    console.log('jwt verify failed');
  }

  next();
};
