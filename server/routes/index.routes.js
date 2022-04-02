const express = require('express');
const IndexRouter = express.Router();
const IndexController = require('./../controllers/index.controller');

IndexRouter.get('/', IndexController.index);
IndexRouter.get('/api', IndexController.welcome);

module.exports = IndexRouter;