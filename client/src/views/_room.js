import React, { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavSideMenu from '../components/NavSideMenu/NavSideMenu';
import Chat from '../components/Chat/Chat';
import socketio from "socket.io-client";
import { config } from '../Constants';
import MainContext from '../context/SocketContext';
import { warnMessage } from '../utils/SwalMessage';
import { useNavigate, useParams } from 'react-router-dom';

const Room = () => {

  // Room name
  const { name } = useParams();

  // ! First argument is socket, null by default
  const [socket, setSocket] = useContext(MainContext);
  const isLogged = localStorage.getItem('loggedIn');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const goToHome = async () => {
    const confirm = await warnMessage('You are not logged in', 'Go to Login page');

    if (confirm) {
      navigate('/login');
    }

  }
  
  useEffect(() => {
    if (isLogged) {
      // ! Only creates a socket connection if the user is logged in and the socket is not already created
      if (!socket) {
        // Connect socket with cookie
        const newSocket = socketio.connect(`${config.url.WS_URL}`, { withCredentials: true});

        // Set socket to MainContext
        setSocket(newSocket);

        // Emit connected event on join room
        newSocket.emit('join', { room: name });

        // Get Socket Id
        newSocket.on('userId', (userId) => {
          localStorage.setItem('userId', userId);
        });
      } else {
        // ! If there is a socket already created, emit join room event
        // Emit connected event on join room
        socket.emit('join', { room: name });

        // Get Socket Id
        socket.on('userId', (userId) => {
          localStorage.setItem('userId', userId);
        });
      }
      // * Important: Return function to clean up after component unmounts
      return () => {
        if (socket) {
          // * Disconnect socket when component unmounts
          socket.emit('leave' , { room: name });
          // ! Don't disconnect socket when component unmounts (keep 1 socket per user alive)
          // socket.disconnect();
        }
      }
    }

    if (!isLogged || !userId) {
      goToHome();
    }

  }, [setSocket, isLogged]);

  return (
    <>
    <NavSideMenu />
    <Container className="position-relative full-height">
      {
        isLogged ? <Chat name={ name }/> : <h1>Not connected</h1>
      }
    </Container>
    </>
  )
}

export default Room;