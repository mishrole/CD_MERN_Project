const express = require('express');
const RoomRouter = express.Router();
const RoomController = require('../controllers/room.controller');
const { authenticate } = require('../config/middlewares/jwt.middleware');

RoomRouter.get('/', authenticate, RoomController.getAllChatrooms);
RoomRouter.post('/', authenticate, RoomController.createRoom);
RoomRouter.get('/:id', authenticate, RoomController.findRoom);

module.exports = RoomRouter;