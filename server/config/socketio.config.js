const jwt = require('jsonwebtoken');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

const announceNewConnection = (socket, decodedToken) => {
  const user = `${decodedToken.firstname} ${decodedToken.lastname}` || 'Anonymous';
  socket.emit('socketId', socket.id);
  // Send a message to all clients except the one that just connected
  socket.broadcast.emit('message_response', { message: `has entered the chat`, date: new Date(), user: user });
}

const getNewMessage = (io, socket, data, decodedToken) => {
  console.log(`Socket ${socket.id} - New Message:`, data);
  const user = `${decodedToken.firstname} ${decodedToken.lastname}` || 'Anonymous';
  // Send a message to all clients except the one that just connected
  // socket.broadcast.emit('message_response', { message: data.message, date: new Date(), user: user, socketId: socket.id });
  io.emit('message_response', { message: data.message, date: new Date(), user: user, socketId: socket.id });
}

const announceDisconnection = (io, socket, decodedToken) => {
  console.log(`Socket ${socket.id} - Disconnected`);
  // * Send a message to all clients including the one that just disconnected
  // * io.emit('connection_status', `${socket.id} has left the chat`);
  const user = `${decodedToken.firstname} ${decodedToken.lastname}` || 'Anonymous';
  // Send a message to all clients except the one that just disconnected
  socket.broadcast.emit('message_response', { message: `has left the chat`, date: new Date(), user: user });
  socket.disconnect();
}

const chat = (io) => {
  io.on('connection', (socket) => {
    // * Each client gets their own socket id
    console.log('New WS connection', socket.id);
    // console.log('\n cookie: ', socket.handshake.headers.cookie.split("; "), '\n');
    // console.log('Handshake cookie', socket.handshake);
    // const cookies = socket.handshake.headers.cookie.split("; ");
    // const usertoken = cookies.filter(cookie => cookie.includes('usertoken'));

    const cookie = socket?.handshake?.headers?.cookie?.split("=")[1];
    const decodedToken = jwt.decode(cookie, secretkey);
    console.log(decodedToken);


    // * Listeners

    // Announce that a new user has connected
    socket.on('connected', () => announceNewConnection(socket, decodedToken));

    // Receives a message and emit to clients
    socket.on('message', (data) => getNewMessage(io, socket, data, decodedToken));

    // Announce that a user has disconnected
    socket.on('disconnected', () => announceDisconnection(io, socket, decodedToken));

  });
}

module.exports = chat;