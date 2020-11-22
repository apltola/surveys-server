const express = require('express');
const Survey = require('../../models/Survey');

const router = express.Router();

router.get('/api/surveys/:id', async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (!survey) {
    res.status(404).send('survey not found');
  }

  res.send(survey);
});

module.exports = {
  showSurveyRouter: router,
};
