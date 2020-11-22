const express = require('express');

const router = express.Router();

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
  res.send(`
      <html>
        <body>
          <div style="font-family: sans-serif;
                      text-align: center;
                      min-height: 70vh;
                      padding-top: 5vh;
                      font-size: 40px;"
          >
            Thanks for the feedback
          </div>
        </body>
      </html>
    `);
});

module.exports = {
  feedbackRouter: router,
};
