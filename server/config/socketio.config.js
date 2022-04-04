const announceNewConnection = (socket) => {
  // Send a message to all clients except the one that just connected
  socket.broadcast.emit('message_response', `${socket.id} has entered the chat`);
}

const getNewMessage = (socket, data) => {
  console.log(`Socket ${socket.id} - New Message:`, data);
  // Send a message to all clients except the one that just connected
  socket.broadcast.emit('message_response', `${socket.id}: ${data}`);
}

const announceDisconnection = (io, socket) => {
  console.log(`Socket ${socket.id} - Disconnected`);
  // * Send a message to all clients including the one that just disconnected
  // * io.emit('connection_status', `${socket.id} has left the chat`);
  // Send a message to all clients except the one that just disconnected
  socket.broadcast.emit('message_response', `${socket.id} has left the chat`);
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
    console.log(cookie);


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