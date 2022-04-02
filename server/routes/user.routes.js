const express = require('express');
const UserRouter = express.Router();
const UserController = require('./../controllers/user.controller');

UserRouter.get('/', UserController.getAllUsers);
UserRouter.get('/:id', UserController.findUser);
UserRouter.post('/', UserController.createUser);

module.exports = UserRouter;