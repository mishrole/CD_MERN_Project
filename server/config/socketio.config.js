const jwt = require('jsonwebtoken');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;
const { userJoin, getCurrentUser, updateSocketId, userLeave, getUsersConnectedToRoom } = require('./../utils/rooms');

const announceNewConnection = (socket, decodedToken) => {
  const user = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  socket.emit('userId', decodedToken?.id);
  // Send a message to all clients except the one that just connected
  socket.broadcast.emit('message_response', { message: `has entered the chat`, date: new Date(), user: user, type: 'announcement' });
}

const getNewMessage = (io, socket, data, decodedToken) => {
  console.log(`Socket ${socket.id} - New Message:`, data);
  const user = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  // Send a message to all clients except the one that just connected
  // socket.broadcast.emit('message_response', { message: data.message, date: new Date(), user: user, socketId: socket.id });
  io.emit('message_response', { message: data.message, date: new Date(), user: user, userId: decodedToken?.id, type: 'message' });
}

const announceDisconnection = (io, socket, decodedToken) => {
  console.log(`Socket ${socket.id} - Disconnected`);
  // * Send a message to all clients including the one that just disconnected
  // * io.emit('connection_status', `${socket.id} has left the chat`);
  const user = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  // Send a message to all clients except the one that just disconnected
  socket.broadcast.emit('message_response', { message: `has left the chat`, date: new Date(), user: user, type: 'announcement' });
  socket.disconnect();
}

const joinRoom = (io, socket, data, decodedToken) => {
  console.log(`Socket ${socket.id} - Joining room:`, data.room);
  const userFullName = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  const joinedUser = userJoin(socket.id, decodedToken?.id, userFullName, data.room);
  // Join the room
  socket.join(joinedUser.room);
  socket.emit('userId', decodedToken?.id);

  // Response with users connected to the room
  const users = getUsersConnectedToRoom(data.room);
  io.to(data.room).emit('users', users);

  // Send a message to all clients in a room except the one that just connected
  socket.broadcast.to(joinedUser.room).emit('message_response', { message: `has joined the chat`, date: new Date(), user: joinedUser.name, type: 'announcement'});
}

const messageRoom = (io, socket, data, decodedToken) => {
  const userFullName = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  // Response with users connected to the room
  const users = getUsersConnectedToRoom(data.room);
  io.to(data.room).emit('users', users);
  io.to(data.room).emit('message_response', { message: data.message, date: new Date(), user: userFullName, userId: decodedToken?.id, type: 'message' });
}

const leaveRoom = (io, socket, data, decodedToken) => {
  const userFullName = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  userLeave(decodedToken?.id, data.room);
  // Response with users connected to the room
  const users = getUsersConnectedToRoom(data.room);
  io.to(data.room).emit('users', users);
  socket.broadcast.to(data.room).emit('message_response', { message: `has left the chat`, date: new Date(), user: userFullName, type: 'announcement' });
  socket.disconnect();
}

// const getRoomUsers = (socket, data) => {
//   const users = getUsersConnectedToRoom(data.room);
//   socket.emit('users_response', users);
// }

const chat = (io) => {
  io.on('connection', (socket) => {
    // * Each client gets their own socket id
    console.log('New WS connection', socket.id);

    // * Decode Cookie
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

    // Join a room
    socket.on('join', (data) => joinRoom(io, socket, data, decodedToken));

    // Message a room
    socket.on('room_message', (data) => messageRoom(io, socket, data, decodedToken));

    // Leave a room
    socket.on('leave', (data) => leaveRoom(io, socket, data, decodedToken));

    // Get users connected to a room
    // socket.on('users', (data) => getRoomUsers(socket, data));

  });
}

module.exports = chat;