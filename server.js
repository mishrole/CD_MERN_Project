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
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true
  }
});

// Routers
const indexRouter = require('./server/routes/index.routes.js');
const authRouter = require('./server/routes/auth.routes.js');
const userRouter = require('./server/routes/user.routes.js');
const chatappRouter = require('./server/routes/chat.routes.js');

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
app.use('/api/chat', chatappRouter);

// Socket.io Listener
// io.on('connection', socket => {
//   // * Each client gets their own socket id
//   console.log('New WS connection', socket.id);

//   // * Receives a message from the Client
//   socket.on('connected', (data) => {
//     console.log(data);
//     // ? Send a message to all connected clients
//     // socket.broadcast.emit('response', 'Response from server');

//     // * Send a message to the client that just connected
//     socket.emit('response', 'Response from the Server');
//   });
// });
const chat = require('./server/config/socketio.config');
chat(io);

// Express Listener
server.listen(port, () => console.log(`Server is running on port ${port}`) )