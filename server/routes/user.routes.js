const express = require('express');
const UserRouter = express.Router();
const UserController = require('./../controllers/user.controller');
const { authenticate } = require('./../config/middlewares/jwt.middleware');

UserRouter.get('/', authenticate, UserController.getAllUsers);
UserRouter.get('/profile', authenticate, UserController.getCurrentUser);
UserRouter.get('/:id', authenticate, UserController.findUser);
UserRouter.post('/', authenticate, UserController.createUser);
UserRouter.put('/', authenticate, UserController.editUser);

module.exports = UserRouter;

// module.exports = app => {
//   app.get('/', authenticate, UserController.getAllUsers);
//   app.get('/:id', authenticate, UserController.findUser);
//   app.post('/', authenticate, UserController.createUser);
// }