const express = require('express');
const User = require('../../models/User');
const requireAuth = require('../../middlewares/requireAuth');

const router = express.Router();

router.get('/api/user', requireAuth, async (req, res) => {
  const user = await User.findById(req.currentUser.id);

  if (!user) {
    res.status(404).send('user not found');
  }

  const { username, surveysCreated, emailsSent, responsesReceived } = user;
  res.send({ username, surveysCreated, emailsSent, responsesReceived });
});

module.exports = {
  showUserRouter: router,
};
