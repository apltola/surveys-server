const express = require('express');
const Survey = require('../../models/Survey');
const { Path } = require('path-parser');
const { URL } = require('url');
const compact = require('lodash.compact');
const isEqual = require('lodash.isequal');
const uniqWith = require('lodash.uniqwith');

const router = express.Router();

router.post('/api/surveys/webhook', async (req, res) => {
  console.log(`WEBHOOK PINGED`);
  const path = new Path('/api/surveys/:surveyId/:choice');

  const events = req.body.map((event) => {
    const match = path.test(new URL(event.url).pathname);
    if (match) {
      return {
        email: event.email,
        surveyId: match.surveyId,
        choice: match.choice,
      };
    }
  });

  const definedEvents = compact(events);
  const uniqueEvents = uniqWith(definedEvents, isEqual);

  uniqueEvents.forEach(({ email, surveyId, choice }) => {
    Survey.updateOne(
      {
        _id: surveyId,
        recipients: {
          $elemMatch: { email, responded: false },
        },
      },
      {
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date(),
      }
    ).exec();
  });

  res.send({});
});

module.exports = {
  webhookRouter: router,
};
