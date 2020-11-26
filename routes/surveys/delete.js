const express = require('express');
const Survey = require('../../models/Survey');
const requireAuth = require('../../middlewares/requireAuth2');

const router = express.Router();

router.delete('/api/surveys/:id', requireAuth, async (req, res) => {
  try {
    await Survey.findByIdAndDelete(req.params.id);
    const surveys = await Survey.find({
      userId: req.currentUser.id,
    });
    res.send(surveys);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred during survey deletion' });
  }
});

module.exports = {
  deleteSurveyRouter: router,
};
