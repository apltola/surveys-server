const express = require('express');
const User = require('../../models/User');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validateRequest');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const router = express.Router();

router.post(
  '/api/auth/signin',
  [
    body('username')
      .not()
      .isEmpty()
      .isString()
      .withMessage('username must be provided'),
    body('password').not().isEmpty().withMessage('password must be provided'),
  ],
  validateRequest,
  async (req, res) => {
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

    // generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      config.jwtSecret
    );

    req.session.jwt = userJwt;
    console.log('cookie -> ', userJwt);
    const cookie = `express:sess=${userJwt}`;
    if (config.nodeEnv === 'production') {
      //res.set('Set-Cookie', cookie);
      res.cookie('express:sess', userJwt, {
        sameSite: 'none',
      });
    }
    res.status(200).send(user);
  }
);

module.exports = {
  signinRouter: router,
};
