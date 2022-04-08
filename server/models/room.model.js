const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [2, 'Description must be at least 2 characters'],
  },
  private: {
    type: Boolean,
    default: false
  },
  code: {
    type: String,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  accessRoom: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccessRoom',
  }]
}, { timestamps: true});

module.exports.Room = mongoose.model('Room', RoomSchema);