import React, { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import NavSideMenu from '../components/NavSideMenu/NavSideMenu';
import Chat from '../components/Chat/Chat';
import socketio from "socket.io-client";
import { config } from '../Constants';
import MainContext from '../context/SocketContext';

const Workspace = () => {
  // ! First argument is socket, null by default
  const [, setSocket] = useContext(MainContext);
  
  useEffect(() => {
    // Connect socket
    const newSocket = socketio.connect(`${config.url.WS_URL}`);
    // Set socket to MainContext
    setSocket(newSocket);
    // Emit connected event
    newSocket.emit('connected');
  }, [setSocket]);

  return (
    <>
    <NavSideMenu />
    <Container className="position-relative full-height">
      <Chat />
    </Container>
    </>
  )
}

export default Workspace;