const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Dotenv Config
require('dotenv').config();
const saltRounds = process.env.SALT_ROUNDS;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val),
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  firstname: {
    type: String,
    required: [true, 'Firstname is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
}, {
  timestamps: true,
  getters: true,
  setters: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true
  }
});

UserSchema.virtual('confirm')
.get(function() { return this._confirm; })
.set(function(value) { this._confirm = value; });

// ? Arrow functions do not bind this
UserSchema.pre('validate', function(next) {
  if (this.password !== this.confirm) {
    this.invalidate('confirm', `Passwords do not match ${this.password} ${this.confirm}`);
  }

  // * Middleware next() is required to continue to the next middleware or function
  next();
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, Number(saltRounds))
  .then(hash => {
    this.password = hash;
    next();
  });
});

module.exports.User = mongoose.model('User', UserSchema);