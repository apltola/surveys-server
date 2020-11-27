const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const { webhookRouter } = require('./routes/surveys/webhook');
const { signoutRouter } = require('./routes/auth/signout');
const { createSurveyRouter } = require('./routes/surveys/new');
const { getSurveysRouter } = require('./routes/surveys');
const { showSurveyRouter } = require('./routes/surveys/show');
const { signinRouter } = require('./routes/auth/signin');
const { signupRouter } = require('./routes/auth/signup');
const { deleteSurveyRouter } = require('./routes/surveys/delete');

const app = express();

app.use(json());
app.use(
  cors({
    credentials: true,
    origin: config.clientOrigin,
  })
);

const connectToDb = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('🥭 Connected to MONGO');
  } catch (error) {
    console.log('Mongo connection failed');
    throw new Error(error);
  }
};

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(getSurveysRouter);
app.use(createSurveyRouter);
app.use(showSurveyRouter);
app.use(deleteSurveyRouter);
app.use(webhookRouter);

const PORT = process.env.PORT || 3222;
app.listen(PORT, () => {
  console.log(`🌐 server listening at ${PORT}`);
});

connectToDb();
