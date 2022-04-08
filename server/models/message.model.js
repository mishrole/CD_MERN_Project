const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [1, 'Message must be at least 1 character'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  date: {
    type: Date,
    default: Date.now,  
  },
  url: {
    type: String,
    default: '',
  }
}, { timestamps: true});

module.exports.Message = mongoose.model('Message', MessageSchema);