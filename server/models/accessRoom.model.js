const mongoose = require('mongoose');

const AccessRoomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Room is required'],
  },
  access: {
    type: Boolean,
    default: false
  }
});

module.exports.AccessRoom = mongoose.model('AccessRoom', AccessRoomSchema);