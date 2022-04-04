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

  // Connected users on join
  const [users, setUsers] = useState([]);

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

      // Emit connected event on join room
      newSocket.emit('join', { room: name });

      // Get Socket Id
      newSocket.on('userId', (userId) => {
        localStorage.setItem('userId', userId);
      });

      // Get users
      newSocket.on('users', (users) => {
        setUsers(users);
      });

      // * Important: Return function to clean up after component unmounts
      return () => {
        // * Disconnect socket when component unmounts
        newSocket.emit('leave' , { room: name });
        newSocket.disconnect();
      }
    } else {
      goToHome();
    }

  }, [setSocket, isLogged, setUsers]);

  return (
    <>
    <NavSideMenu />
    <Container className="position-relative full-height">
      {
        isLogged ? <Chat name={ name } users={ users }/> : <h1>Not connected</h1>
      }
    </Container>
    </>
  )
}

export default Room;