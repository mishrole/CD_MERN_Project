const { Room } = require('../models/room.model');
const jwt = require('jsonwebtoken');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

const getAllChatrooms = (req, res) => {
  Room.find({}).sort({ name: 'asc' })
  .then(data =>
    res.status(200).json({
      rooms: data
    })
  )
  .catch(err =>
    res.status(400).json({
      message: 'Error getting all rooms',
      error: err
    })  
  );
}

const createRoom = (req, res) => {
  const { name, description, private, code } = req.body;
  const usertoken = req.cookies.usertoken;
  const decodedToken = jwt.decode(usertoken, secretkey);

  if (!name || !description) {
    return res.status(406).json({
      message: 'Please provide name and description'
    });
  } else {
    const newRoom = {
      name,
      description,
      private,
      code,
      userId: decodedToken.id
    }

    Room.create(newRoom)
    .then(result => {
      const payload = {
        id: result._id,
        name: result.name,
        description: result.description,
        private: result.private,
        code: result.code
      };

      return res.status(201).json({
        message: 'Room created successfully',
        room: payload
      });
    })
    .catch(err => {
      console.log(err);

      
      console.log(err);

      if (err.name === 'MongoError' || err.code === 11000) {
        return res.status(400).json({
          message: 'Error creating room',
          error: err
        });
      }
    });
  }
}

const findRoom = (req, res) => {
  Room.findOne({ _id: req.params.id })
  .then(data =>
    res.status(200).json({
      room: data
    })
  )
  .catch(err =>
    res.status(400).json({
      message: `Error getting room wit Id ${req.params.id}`,
      error: err
    })
  );
}

const ChatappController = {
  getAllChatrooms,
  createRoom,
  findRoom
}

module.exports = ChatappController;
