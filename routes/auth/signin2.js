const express = require('express');
const User = require('../../models/User');

const router = express.Router();

router.post('/api/auth/signin2', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    usernameLowerCase: username.toLowerCase(),
  });
  if (!user) {
    return res
      .status(400)
      .send({ errors: [{ msg: 'incorrect username or password' }] });
  }

  const passwordsMatch = await user.comparePassword(password, user.password);
  if (!passwordsMatch) {
    return res
      .status(400)
      .send({ errors: [{ msg: 'incorrect username or password' }] });
  }

  res.status(200).send(user);
});

module.exports = {
  signin2Router: router,
};
