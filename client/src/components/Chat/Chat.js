import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../../context/SocketContext';
import MessageForm from './MessageForm/MessageForm';
import MessagesList from './MessagesList/MessagesList';

const Chat = (props) => {
  const roomName = props?.name || 'global';
  const users = props?.users;

  const [socket] = useContext(MainContext);
  const isLogged = localStorage.getItem('loggedIn');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
   if (isLogged && socket) {
    socket.on('message_response', (response) => {
      console.log(response);
      // ! 😱
      // setMessages([...messages, response]);
      setMessages (prevMessages => {
        return [...prevMessages, response];
      })
    });
   }
  // ! Causes an ugly re-rendering 😱
  // }, [socket, messages, isLogged]);
  }, [socket, isLogged]);

  const onFormSubmit = (data) => {
    socket.emit('room_message', data);
  }

  return (
    <div className="px-3 d-flex flex-column position-absolute start-0 end-0 top-0 bottom-0">
      {
        socket ? 
        <MessagesList messages={ messages } />
        : <div>
          <h3>Received messages:</h3>
          <h1>Not connected</h1>
        </div>
      }

      <div className="flex-shink-0">
        <MessageForm onSubmitProp={ onFormSubmit } roomName={ roomName } users={users.length || 0}/>
      </div>

    </div>
    
  )
}

export default Chat;