const express = require('express');
const Survey = require('../../models/Survey');
const requireAuth2 = require('../../middlewares/requireAuth2');

const router = express.Router();

router.get('/api/surveys', requireAuth2, async (req, res) => {
  console.log('uuuseri --> ', req.currentUser);
  const surveys = await Survey.find({ userId: req.currentUser.id }).select({
    recipients: false,
  });

  surveys.reverse();
  res.send(surveys);
});

/* router.post('/api/email', (req, res) => {
  const msg = {
    to: 'aleksijaakkojuhani@gmail.com', // Change to your recipient
    from: 'no.reply@lippujahetimulle.com', // Change to your verified sender
    subject: 'SendGrid test',
    text: 'with Node.js',
    html: `<div>
        <p>
          hello hello this is a test
        </p>
        <div>
          <a href="http://localhost:3222">jees</a>
        </div>
      </div>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.send('email sent successfully');
    })
    .catch((error) => {
      res.send(error);
    });
}); */

module.exports = {
  getSurveysRouter: router,
};
