const { Message } = require('../models/message.model');
const jwt = require('jsonwebtoken');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

const getRoomMessages = (req, res) => {
  const { roomId } = req.params;

  Message.find({ roomId })
  .then(data =>
    res.status(200).json({
      messages: data
    })
  )
  .catch(err =>
    res.status(400).json({
      message: `Error getting all messages from room ${roomId}`,
      error: err
    })  
  );
}

const createRoomMessage = (req, res) => {
  const { roomId, message } = req.body;
  const usertoken = req.cookies.usertoken;
  const decodedToken = jwt.decode(usertoken, secretkey);

  if (!roomId || !message) {
    return res.status(406).json({
      message: 'Please provide roomId and message'
    });
  } else {

    const newMessage = {
      message,
      userId: decodedToken.id,
      room: roomId,
    }
    
    Message.create(newMessage)
    .then(result => {
      const payload = {
        id: result._id,
        roomId: result.roomId,
        message: result.message
      };

      return res.status(201).json({
        message: 'Message created successfully',
        message: payload
      });

    })
    .catch(err => {

      console.log(err);

      if (err.name === 'MongoError' || err.code === 11000) {
        return res.status(400).json({
          message: 'Error creating message',
          error: err
        });
      }
    });
  }
}

const MessageController = {
  getRoomMessages,
  createRoomMessage
}

module.exports = MessageController;