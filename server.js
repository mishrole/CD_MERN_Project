// Express
const express = require('express');
// Cors
const cors = require('cors');
// Cookie Parser
const cookieParser = require('cookie-parser');

const app = express();
const http = require('http');
const port = 8000;

// Socket.io
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Routers
const indexRouter = require('./server/routes/index.routes.js');
const authRouter = require('./server/routes/auth.routes.js');
const userRouter = require('./server/routes/user.routes.js');
const chatappRouter = require('./server/routes/chatapp.routes.js');

// Mongoose Config
require('./server/config/mongoose.config');

// Middleware
app.use(cookieParser());

app.use(cors({ 
  credentials: true,
  origin: 'http://localhost:3000',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/chatapp', chatappRouter);

// Express Listener
server.listen(port, () => console.log(`Server is running on port ${port}`) )

// Socket.io Listener
io.on('connection', socket => {
  // * Each client gets their own socket id
  console.log('New WS connection', socket.id);

  socket.on('event_from_client', data => {
    // * Broadcast emit to all other clients besides the client who is actually emitting the event
    socket.broadcast.emit('send_data_to_all_other_clients', data);
  })
});
