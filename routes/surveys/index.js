const express = require('express');
const Survey = require('../../models/Survey');
const requireAuth = require('../../middlewares/requireAuth');

const router = express.Router();

router.get('/api/surveys', requireAuth, async (req, res) => {
  const surveys = await Survey.find({ userId: req.currentUser.id }).select({
    recipients: false,
  });

  surveys.reverse();
  res.send(surveys);
});

// for testing purposes
router.get('/api/surveys/:userid', async (req, res) => {
  const surveys = await Survey.find({ userId: req.params.userid }).select({
    recipients: false,
  });
  surveys.reverse();
  res.send(surveys);
});

module.exports = {
  getSurveysRouter: router,
};
