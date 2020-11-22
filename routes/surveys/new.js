const express = require('express');
const Survey = require('../../models/Survey');
const surveyTemplate = require('../../services/emailTemplates/surveyTemplate');
const requireAuth = require('../../middlewares/requireAuth');
const sgMail = require('@sendgrid/mail');
const { sendgridKey } = require('../../config');
sgMail.setApiKey(sendgridKey);

const router = express.Router();

router.post('/api/surveys', requireAuth, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    body,
    subject,
    recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
    userId: req.currentUser.id,
    dateSent: Date.now(),
  });

  const template = surveyTemplate(survey);
  const msg = {
    to: survey.recipients,
    from: 'no-reply@lippujahetimulle.com', // Change to your verified sender
    subject: survey.subject,
    text: 'yes hello this is text',
    html: template,
  };

  try {
    await sgMail.sendMultiple(msg);
    await survey.save();
    res.send('email sent successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  createSurveyRouter: router,
};