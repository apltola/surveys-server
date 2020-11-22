const express = require('express');
const User = require('../../models/User');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const validateRequest = require('../../middlewares/validateRequest');

const router = express.Router();

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
      return res
        .status(400)
        .send({ errors: [{ msg: 'Username already in use!' }] });
    }

    const user = new User({
      username,
      usernameLowerCase: username.toLowerCase(),
      password,
    });

    await user.save();

    // generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      config.jwtSecret
    );

    req.session.jwt = userJwt;
    res.status(201).send(user);
  }
);

module.exports = {
  signupRouter: router,
};
