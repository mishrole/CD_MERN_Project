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

// Mongoose Config
require('./server/config/mongoose.config');

// Middleware
app.use(cookieParser());

// Cors config
app.use(cors({ 
  credentials: true,
  origin: 'http://localhost:3000',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Config
require('./server/routes/routes.js')(app);

// Socket.io Config
const chat = require('./server/config/socketio.config');
chat(io);

// Express Listener
server.listen(port, () => console.log(`Server is running on port ${port}`) )