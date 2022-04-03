import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import MainContext from '../../context/SocketContext';

const Chat = () => {

  const socket = useContext(MainContext);
  const [message, setMessage] = useState('');

  const sendConnected = () => {
    socket.emit('connected', 'Hi there from the Client').on('response', (data) => {
      console.log(data);
      setMessage(data);
    })
  }

  // useEffect(() => {
  //   const socket = io('//localhost:8000');

  //   // * Send a message to the server
  //   socket.emit('connected', 'hi there from client');

  //   // * Receive a message from the server
  //   socket.on('response', (arg) => {
  //     console.log(arg);
  //   })
  // }, []);

  return (
    <>
      <Button onClick={sendConnected}>Send: Hi there from the Client</Button>

      <h3>Received message:</h3>
      <p>{message}</p>
    </>
    
  )
}

export default Chat;