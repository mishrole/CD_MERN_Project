// Express
const express = require('express');
// Cors
const cors = require('cors');

const app = express();
const http = require('http');
const port = 8000;

// Socket.io
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Routers
const indexRouter = require('./server/routes/index.routes.js');
const userRouter = require('./server/routes/user.routes.js');
const chatappRouter = require('./server/routes/chatapp.routes.js');

// Mongoose Config
require('./server/config/mongoose.config');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/chatapp', chatappRouter);

// Express Listener
server.listen(port, () => console.log(`Server is running on port ${port}`) )

// Socket.io Listener
io.on('connection', socket => console.log('new WS connection'));
