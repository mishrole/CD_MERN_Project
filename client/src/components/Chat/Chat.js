import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import MainContext from '../../context/SocketContext';
import { config } from '../../Constants';
import MessageForm from './MessageForm/MessageForm';

const Chat = () => {

  const socket = useContext(MainContext);
  const [messages, setMessages] = useState([]);
  const [currentSocket, setCurrentSocket] = useState(null);
  const [isLogged, setIsLogged] = useState(localStorage.getItem('loggedIn'));

  useEffect(() => {
    if (isLogged) {
      // * New Socket connection every time the component is mounted
      // ! This is not the best way to do it, but it works for now
      const newSocket = socket.connect(`${config.url.WS_URL}`);
      setCurrentSocket(newSocket);
      return () => newSocket.close();
    }



    // // * Send a message to the server
    // socket.emit('connected', 'hi there from client');

    // // * Receive a message from the server
    // socket.on('response', (arg) => {
    //   console.log(arg);
    // })
  }, [isLogged, socket, setCurrentSocket]);

  const onFormSubmit = (data) => {
    currentSocket.emit('message', data.message).on('message', (response) => {
      setMessages([...messages, response]);
    });
  }

  const sendConnected = () => {
    // * Send a message to the server
    currentSocket.emit('connected', 'Hi there from the Client')
    // * Receive a message from the server
          .on('response', (data) => {
            setMessages(previousMessages => [data, ...previousMessages]);
          }
    );
  }

  return (
    <>
      <MessageForm onSubmitProp={ onFormSubmit }/>
      {/* <Button onClick={sendConnected}>Send: Hi there from the Client</Button> */}

      {
        currentSocket ? 
        <div>
          <h3>Received message:</h3>
          <div>{messages.map((message, index) => <p key={index}>{message}</p>)}</div>
        </div> 
        : <h1>Not connected</h1>
      }

    </>
    
  )
}

export default Chat;