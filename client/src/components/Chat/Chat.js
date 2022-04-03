import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {

  useEffect(() => {
    const socket = io('//localhost:8000');

    // * Send a message to the server
    socket.emit('connected', 'hi there from client');

    // * Receive a message from the server
    socket.on('response', (arg) => {
      console.log(arg);
    })
  }, []);

  return (
    <div>Chat</div>
  )
}

export default Chat;