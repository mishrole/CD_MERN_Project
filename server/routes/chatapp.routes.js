const express = require('express');
const ChatAppRouter = express.Router();
const ChatAppController = require('../controllers/chatapp.controller');

ChatAppRouter.get('/', ChatAppController.getAllChatrooms);

module.exports = ChatAppRouter;