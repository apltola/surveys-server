const express = require('express');
const currentUser = require('../../middlewares/currentUser');
const User = require('../../models/User');

const router = express.Router();

router.get('/api/auth/currentuser', currentUser, async (req, res) => {
  if (!req.currentUser) {
    return res.send({ currentUser: null });
  }
  const user = await User.findById(req.currentUser.id);
  const { username, id } = user;

  res.send({
    currentUser: { username, id },
  });
});

module.exports = {
  currentUserRouter: router,
};
