const express = require('express');
const User = require('../../models/User');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const validateRequest = require('../../middlewares/validateRequest');

const router = express.Router();

/* 
  only purpose is to create a new user user in database.
  session with jwt token is created in another server.
*/
router.post(
  '/api/auth/signup',
  [
    body('username')
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage('Username must be 2 to 20 characters long'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be 4 to 20 characters long'),
  ],
  validateRequest,
  async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      usernameLowerCase: username.toLowerCase(),
    });
    if (existingUser) {
      return res.status(400).send('username-reserved');
    }

    const user = new User({
      username,
      usernameLowerCase: username.toLowerCase(),
      password,
    });

    await user.save();
    res.status(201).send(user);
  }
);

module.exports = {
  signupRouter: router,
};
