const announceNewConnection = (socket) => {
  // Send a message to all clients except the one that just connected
  socket.broadcast.emit('connection_status', `${socket.id} has entered the chat`);
  // Send a message to all clients except the one that just connected
  socket.broadcast.emit('get_message', `${socket.id} has entered the chat`);
}

const getNewMessage = (socket, data) => {
  console.log(`Socket ${socket.id} - New Message:`, data);
  // Send a message to all clients except the one that just connected
  socket.broadcast.emit('get_message', `${socket.id}: ${data}`);
}

const announceDisconnection = (io, socket) => {
  console.log(`Socket ${socket.id} - Disconnected`);
  // Send a message to all clients including the one that just disconnected
  io.emit('connection_status', `${socket.id} has left the chat`);
  // Send a message to all clients except the one that just disconnected
  socket.broadcast.emit('get_message', `${socket.id} has left the chat`);
  socket.disconnect();
}

const chat = (io) => {
  io.on('connection', (socket) => {
    // * Each client gets their own socket id
    console.log('New WS connection', socket.id);

    // * Listeners

    // Announce that a new user has connected
    socket.on('connected', () => announceNewConnection(socket));

    // Receives a message and emit to clients
    socket.on('message', (data) => getNewMessage(socket, data));

    // Announce that a user has disconnected
    socket.on('disconnected', () => announceDisconnection(io, socket));

  });
}

module.exports = chat;