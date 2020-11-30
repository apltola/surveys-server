const express = require('express');
const Survey = require('../../models/Survey');
const User = require('../../models/User');
const surveyTemplate = require('../../services/emailTemplates/surveyTemplate');
const requireAuth = require('../../middlewares/requireAuth');
const sgMail = require('@sendgrid/mail');
const { sendgridKey } = require('../../config');
sgMail.setApiKey(sendgridKey);

const router = express.Router();

router.post('/api/surveys', requireAuth, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const formattedRecipients = recipients
    .split(',')
    .map((email) => ({ email: email.trim() }));

  const survey = new Survey({
    title,
    body,
    subject,
    recipients: formattedRecipients,
    recipientsAmount: formattedRecipients.length,
    userId: req.currentUser.id,
    dateSent: Date.now(),
  });

  const template = surveyTemplate(survey);
  const msg = {
    to: survey.recipients,
    from: {
      email: 'no-reply@lippujahetimulle.com', // verfied sender on sendgrid
      name: 'Yes|No Surveys',
    },
    subject: survey.subject,
    text: 'text',
    html: template,
  };

  try {
    await sgMail.sendMultiple(msg);
    await survey.save();
    await User.updateOne(
      { _id: req.currentUser.id },
      {
        $inc: {
          surveysCreated: 1,
          emailsSent: formattedRecipients.length,
        },
      }
    );
    res.send('email sent successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  createSurveyRouter: router,
};
