import React, { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavSideMenu from '../components/NavSideMenu/NavSideMenu';
import Chat from '../components/Chat/Chat';
import socketio from "socket.io-client";
import { config } from '../Constants';
import MainContext from '../context/SocketContext';
import { errorMessage, warnMessage } from '../utils/SwalMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { findRoom } from './../helpers/rooms/findRoom';

const Room = () => {

  // Room name
  const { name } = useParams();
  const [room, setRoom] = useState(null);

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

  const goToNotFound = () => navigate('/not-found');

  const joinRoom = (specificSocket) => {
    // Emit connected event on join room
    specificSocket.emit('join', { room: name });

    // Get Socket Id
    specificSocket.on('userId', (userId) => {
      localStorage.setItem('userId', userId);
    });
  }

  useEffect(() => {
    // * Important: Return function to clean up after component unmounts
    return () => {
      if (socket) {
        // ! Don't disconnect socket when component unmounts (keep 1 socket per user alive)
        // // * Disconnect socket when component unmounts
        // Emit message to broadcast in room
        socket.emit('leave' , { room: name });
        // socket.disconnect();
      }
    }
  }, []);
  
  useEffect(() => {
    if (isLogged) {

      // * Find room by Id (Param)
      findRoom(name)
      .then((data) => {
        if (data.room) {
          console.log(data.room);
          setRoom(data.room);
          // ! Only creates a socket connection if the user is logged in and the socket is not already created
          if (!socket) {
            // Connect socket with cookie
            const newSocket = socketio.connect(`${config.url.WS_URL}`, { withCredentials: true});

            // Set socket to MainContext
            setSocket(newSocket);

            joinRoom(newSocket);

          } else {
            // ! If there is a socket already created, emit join room event
            joinRoom(socket);
          }

        } else {
          goToNotFound();
        }
      })
      .catch((err) => {
        console.warn(err);
        errorMessage(err?.error?._message || err?.message || err?.error?.message);
      });
    }

    if (!isLogged) {
      goToHome();
    }

  }, [setSocket, isLogged]);

  return (
    <>
    <NavSideMenu />
    <Container className="position-relative full-height">
      {
        isLogged ? <Chat room={ room } name={ name }/> : <h1>Not connected</h1>
      }
    </Container>
    </>
  )
}

export default Room;