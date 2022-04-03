import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../../context/SocketContext';
import MessageForm from './MessageForm/MessageForm';

const Chat = () => {
  const [socket] = useContext(MainContext);
  const isLogged = localStorage.getItem('loggedIn');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
   if (isLogged && socket) {
    socket.on('get_message', (response) => {
      console.log(response);
      setMessages([...messages, response]);
    });
   }
  }, [socket, messages, isLogged]);

  const onFormSubmit = (data) => {
    socket.emit('message', data.message);
  }

  return (
    <>
      <MessageForm onSubmitProp={ onFormSubmit }/>

      {
        socket ? 
        <div>
          <h3>Received messages:</h3>
          <div>{messages.map((message, index) => <p key={index}>{message}</p>)}</div>
        </div> 
        : <div>
          <h3>Received messages:</h3>
          <h1>Not connected</h1>
        </div>
      }

    </>
    
  )
}

export default Chat;