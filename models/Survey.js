const mongoose = require('mongoose');
const recipientSchema = require('./Recipient');

const surveySchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    body: String,
    subject: String,
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    dateSent: Date,
    lastResponded: Date,
    recipients: [recipientSchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
