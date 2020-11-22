const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  sendgridKey: process.env.SENDGRID_API_KEY,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  clientOrigin: process.env.CLIENT_ORIGIN,
};
