const express = require('express');
const AuthRouter = express.Router();
const AuthController = require('./../controllers/auth.controller');
const { authenticate } = require('../config/middlewares/jwt.middleware');

AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);
AuthRouter.get('/logout', authenticate, AuthController.logout);

module.exports = AuthRouter;