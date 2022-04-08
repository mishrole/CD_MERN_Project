const jwt = require('jsonwebtoken');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;
const { userJoin, userLeave, getUsersConnectedToRoom, getUsers, userLogout, leaveFromAll } = require('./../utils/rooms');

// Connected socket: io.sockets.sockets

const announceNewConnection = (io, socket) => {
  // * Decode Cookie
  const cookie = socket?.handshake?.headers?.cookie?.split("=")[1];
  const decodedToken = jwt.decode(cookie, secretkey);
  const user = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  socket.emit('userId', decodedToken?.id);
  // Send a message to all clients except the one that just connected
  socket.broadcast.emit('message_response', { message: `has entered the chat`, date: new Date(), user: user, type: 'announcement' });
}

const getNewMessage = (io, socket, data) => {
  // * Decode Cookie
  const cookie = socket?.handshake?.headers?.cookie?.split("=")[1];
  const decodedToken = jwt.decode(cookie, secretkey);
  console.log(`Socket ${socket.id} - New Message:`, data);
  const user = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  // Send a message to all clients except the one that just connected
  // socket.broadcast.emit('message_response', { message: data.message, date: new Date(), user: user, socketId: socket.id });
  io.emit('message_response', { message: data.message, date: new Date(), user: user, userId: decodedToken?.id, type: 'message' });
}

const announceDisconnection = (io, socket) => {
  // * Decode Cookie
  const cookie = socket?.handshake?.headers?.cookie?.split("=")[1];
  const decodedToken = jwt.decode(cookie, secretkey);
  console.log(`Socket ${socket.id} - Disconnected`);
  // * Send a message to all clients including the one that just disconnected
  // * io.emit('connection_status', `${socket.id} has left the chat`);
  const user = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  userLogout(decodedToken?.id);
  // Send a message to all clients except the one disconnected
  socket.broadcast.emit('message_response', { message: `has left the server`, date: new Date(), user: user, type: 'announcement' });
  socket.disconnect();
}

const joinRoom = (io, socket, data) => {
  // * Decode Cookie
  const cookie = socket?.handshake?.headers?.cookie?.split("=")[1];
  const decodedToken = jwt.decode(cookie, secretkey);
  const userFullName = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  leaveFromAll(decodedToken?.id);
  const joinedUser = userJoin(socket.id, decodedToken?.id, userFullName, data.room);
  // Join the room
  socket.join(joinedUser.room);
  socket.emit('userId', decodedToken?.id);
  
  // const users = getUsersConnectedToRoom(data.room);
  
  // Response with users connected to the room
  const roomAdapter = io.sockets.adapter.rooms.get(data.room);
  const socketsInRoom = roomAdapter ? roomAdapter.size : 0;
  io.to(data.room).emit('users', socketsInRoom);
  
  console.log(`Socket ${socket.id} - Joining room: ${data.room}. Sockets in room: ${io.sockets.adapter.rooms.get(data.room)?.size}`);
  // Send a message to all clients in a room except the one that just connected
  // socket.broadcast.to(joinedUser.room).emit('message_response', { message: `has joined the chat`, date: new Date(), user: joinedUser.name, type: 'announcement'});
  socket.to(joinedUser.room).emit('message_response', { room: data.room, message: `has joined the chat`, date: new Date(), user: joinedUser.name, type: 'announcement'});
}

const messageRoom = (io, socket, data) => {
  // * Decode Cookie
  const cookie = socket?.handshake?.headers?.cookie?.split("=")[1];
  const decodedToken = jwt.decode(cookie, secretkey);
  const userFullName = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  console.log(`Sockets connected in room when message is sended: ${io.sockets.adapter.rooms.get(data.room)?.size} | Total sockets: ${io.sockets.sockets.size}`);
  console.log('Socket is present in rooms:', socket.rooms);
  // Response with users connected to the room
  const roomAdapter = io.sockets.adapter.rooms.get(data.room);
  const socketsInRoom = roomAdapter ? roomAdapter.size : 0;
  // const users = getUsersConnectedToRoom(data.room);
  io.to(data.room).emit('users', socketsInRoom);
  io.to(data.room).emit('message_response', { room: data.room, message: data.message, date: new Date(), user: userFullName, userId: decodedToken?.id, type: 'message' });
}

const leaveRoom = (io, socket, data) => {
  // * Decode Cookie
  const cookie = socket?.handshake?.headers?.cookie?.split("=")[1];
  const decodedToken = jwt.decode(cookie, secretkey);
  const userFullName = `${decodedToken?.firstname} ${decodedToken?.lastname}` || 'Anonymous';
  socket.to(data.room).emit('message_response', { room: data.room, message: `has left the chat`, date: new Date(), user: userFullName, type: 'announcement' });
  // Response with users connected to the room
  // const users = getUsersConnectedToRoom(data.room);
  const roomAdapter = io.sockets.adapter.rooms.get(data.room);
  const socketsInRoom = roomAdapter ? roomAdapter.size : 0;
  userLeave(decodedToken?.id, socket.id);
  // ! Don't disconnect the socket when the user leaves a room
  // socket.broadcast.to(data.room).emit('message_response', { message: `has left the chat`, date: new Date(), user: userFullName, type: 'announcement' });
  socket.leave(data.room, socket.id);
  io.to(data.room).emit('users', socketsInRoom);
  console.log(`Socket ${socket.id} - Leaving room: ${data.room}. Sockets in room: ${io.sockets.adapter.rooms.get(data.room)?.size}`);
  // socket.disconnect();
}

// const getRoomUsers = (socket, data) => {
//   const users = getUsersConnectedToRoom(data.room);
//   socket.emit('users_response', users);
// }

const chat = (io) => {
  io.on('connection', (socket) => {
    // * Each client gets their own socket id
    console.log('New WS connection', socket.id);
    console.log('Current sockets', io.sockets.sockets.size);

    // * Listeners

    // Announce that a new user has connected
    socket.on('connected', () => announceNewConnection(io, socket));

    // Receives a message and emit to clients
    socket.on('message', (data) => getNewMessage(io, socket, data));

    // Announce that a user has disconnected
    socket.on('disconnected', () => announceDisconnection(io, socket));

    // Join a room
    socket.on('join', (data) => joinRoom(io, socket, data));

    // Message a room
    socket.on('room_message', (data) => messageRoom(io, socket, data));

    // Leave a room
    socket.on('leave', (data) => leaveRoom(io, socket, data));

    // Get users connected to a room
    // socket.on('users', (data) => getRoomUsers(socket, data));

  });
}

module.exports = chat;