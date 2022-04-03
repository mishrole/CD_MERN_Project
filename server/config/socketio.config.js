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

function chat(io) {
  io.on('connection', (socket) => {
    // * Each client gets their own socket id
    console.log('New WS connection', socket.id);

    // * Listeners

    // Announce that a new user has connected
    socket.on('connected', () => {
      // Send a message to all clients except the one that just connected
      socket.broadcast.emit('connection_status', `${socket.id} has entered the chat`);
      // Send a message to all clients except the one that just connected
      socket.broadcast.emit('get_message', `${socket.id} has entered the chat`);
    });

    // Receives a message and emit to clients
    socket.on('message', (data) => {
      console.log(`Socket ${socket.id} - New Message:`, data);
      // Send a message to all clients except the one that just connected
      socket.broadcast.emit('get_message', `${socket.id}: ${data}`);
    });

    // Announce that a user has disconnected
    socket.on('disconnected', () => {
      console.log(`Socket ${socket.id} - Disconnected`);
      // Send a message to all clients including the one that just disconnected
      io.emit('connection_status', `${socket.id} has left the chat`);
      // Send a message to all clients except the one that just disconnected
      socket.broadcast.emit('get_message', `${socket.id} has left the chat`);
      socket.disconnect();
    });

  });
}

module.exports = chat;