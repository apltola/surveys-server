const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema(
  {
    email: String,
    responded: { type: Boolean, default: false },
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

module.exports = recipientSchema;
