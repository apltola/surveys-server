const express = require('express');
const Survey = require('../../models/Survey');
const User = require('../../models/User');
const { Path } = require('path-parser');
const { URL } = require('url');
const compact = require('lodash.compact');
const isEqual = require('lodash.isequal');
const uniqWith = require('lodash.uniqwith');

const router = express.Router();

/* 
  handle sendgrid webhooks on email clicked events.
*/
router.post('/api/surveys/webhook', async (req, res) => {
  console.log(`WEBHOOK PINGED`);
  //const path = new Path('/api/surveys/:surveyId/:choice');
  const path = new Path('/surveys/:surveyId/feedback');

  const events = req.body.map((event) => {
    console.log('event.url -> ', event.url);
    const url = new URL(event.url);
    const match = path.test(url.pathname);
    if (match) {
      return {
        email: event.email,
        surveyId: match.surveyId,
        choice: url.searchParams.get('choice'),
      };
    }
  });

  const definedEvents = compact(events);
  const uniqueEvents = uniqWith(definedEvents, isEqual);

  uniqueEvents.forEach(({ email, surveyId, choice }) => {
    const updateDocuments = async () => {
      const survey = await Survey.findOneAndUpdate(
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
      );

      if (survey) {
        console.log('updated survey -> ', survey._id);
        await User.findByIdAndUpdate(
          { _id: survey.userId },
          {
            $inc: { responsesReceived: 1 },
          }
        );
      }
    };

    updateDocuments();
  });

  res.send({});
});

module.exports = {
  webhookRouter: router,
};
