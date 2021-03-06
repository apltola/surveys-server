const mongoose = require('mongoose');
const { randomBytes, scrypt } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    usernameLowerCase: { type: String, required: true },
    password: { type: String, required: true },
    surveysCreated: { type: Number, default: 0 },
    emailsSent: { type: Number, default: 0 },
    responsesReceived: { type: Number, default: 0 },
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

userSchema.methods.toHash = async function (password) {
  const salt = randomBytes(8).toString('hex');
  const buf = await scryptAsync(password, salt, 64);

  return `${buf.toString('hex')}.${salt}`;
};

userSchema.methods.comparePassword = async function (
  providedPassword,
  storedPassword
) {
  const [hashedPassword, salt] = storedPassword.split('.');
  const buf = await scryptAsync(providedPassword, salt, 64);

  return buf.toString('hex') === hashedPassword;
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await this.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
