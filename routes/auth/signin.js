const express = require('express');
const User = require('../../models/User');

const router = express.Router();

/* 
  the only purpose is to check if provided user exists in database and password is correct.
  session with jwt token is created in another server.
*/
router.post('/api/auth/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    usernameLowerCase: username.toLowerCase(),
  });
  if (!user) {
    return res.status(400).send('incorrect-credentials');
  }

  const passwordsMatch = await user.comparePassword(password, user.password);
  if (!passwordsMatch) {
    return res.status(400).send('incorrect-credentials');
  }

  res.status(200).send(user);
});

module.exports = {
  signinRouter: router,
};
