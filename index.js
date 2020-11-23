const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const config = require('./config');
const currentUserMiddleware = require('./middlewares/currentUser');
const { webhookRouter } = require('./routes/surveys/webhook');
const { signupRouter } = require('./routes/auth/signup');
const { currentUserRouter } = require('./routes/auth/currentUser');
const { signinRouter } = require('./routes/auth/signin');
const { signoutRouter } = require('./routes/auth/signout');
const { createSurveyRouter } = require('./routes/surveys/new');
const { feedbackRouter } = require('./routes/surveys/feedback');
const { getSurveysRouter } = require('./routes/surveys');
const { showSurveyRouter } = require('./routes/surveys/show');
const path = require('path');
const { signin2Router } = require('./routes/auth/signin2');

const app = express();

app.use(json());
app.use(
  cors({
    credentials: true,
    origin: config.clientOrigin,
  })
);
app.use(
  cookieSession({
    signed: false,
    secure: config.nodeEnv === 'production',
    sameSite: false,
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

app.get('/api', (req, res) => {
  res.send('hello from api');
});

app.get('/api/test', (req, res) => {
  res.send(
    `nodeEnv -> ${config.nodeEnv}, clientOrigin -> ${config.clientOrigin}`
  );
});

//app.use(currentUserMiddleware);
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signin2Router);
app.use(signoutRouter);

app.use(getSurveysRouter);
app.use(createSurveyRouter);
app.use(showSurveyRouter);
app.use(webhookRouter);
app.use(feedbackRouter);

const PORT = process.env.PORT || 3222;
app.listen(PORT, () => {
  console.log(`🌐 server listening at ${PORT}`);
});

connectToDb();
