const express = require('express');
const ChatAppRouter = express.Router();
const ChatAppController = require('../controllers/chatapp.controller');
const { authenticate } = require('../config/middlewares/jwt.middleware');

ChatAppRouter.get('/', authenticate, ChatAppController.getAllChatrooms);

module.exports = ChatAppRouter;