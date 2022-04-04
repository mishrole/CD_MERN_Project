import React, { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import NavSideMenu from '../components/NavSideMenu/NavSideMenu';
import Chat from '../components/Chat/Chat';
import socketio from "socket.io-client";
import { config } from '../Constants';
import MainContext from '../context/SocketContext';
import { warnMessage } from '../utils/SwalMessage';
import { useNavigate } from 'react-router-dom';

const Workspace = () => {
  // ! First argument is socket, null by default
  const [, setSocket] = useContext(MainContext);
  const isLogged = localStorage.getItem('loggedIn');
  const navigate = useNavigate();

  const goToHome = async () => {
    const confirm = await warnMessage('You are not logged in', 'Go to Login page');

    if (confirm) {
      navigate('/login');
    }

  }
  
  useEffect(() => {
    if (isLogged) {
      // Connect socket with cookie
      const newSocket = socketio.connect(`${config.url.WS_URL}`, { withCredentials: true});
      // Set socket to MainContext
      setSocket(newSocket);

      // Emit connected event
      newSocket.emit('connected');

      // Get Socket Id
      newSocket.on('socketId', (socketId) => {
        localStorage.setItem('socketId', socketId);
      });

      // * Important: Return function to clean up after component unmounts
      return () => {
        // * Disconnect socket when component unmounts
        newSocket.emit('disconnected');
        newSocket.disconnect();
      }
    } else {
      goToHome();
    }

  }, [setSocket, isLogged]);

  return (
    <>
    <NavSideMenu />
    <Container className="position-relative full-height">
      {
        isLogged ? <Chat /> : <h1>Not connected</h1>
      }
    </Container>
    </>
  )
}

export default Workspace;