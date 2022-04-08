// Routers
const indexRouter = require('./index.routes.js');
const authRouter = require('./auth.routes.js');
const userRouter = require('./user.routes.js');
const roomRouter = require('./room.routes.js');

function routes(app) {
  // Routes
  app.use('/', indexRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/rooms', roomRouter);
}

module.exports = routes;