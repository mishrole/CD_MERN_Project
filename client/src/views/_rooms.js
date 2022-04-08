import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { errorMessage, warnMessage } from '../utils/SwalMessage';
import NavSideMenu from '../components/NavSideMenu/NavSideMenu';
import { getAllRooms } from '../helpers/rooms/getAllRooms';

const Rooms = () => {
  const isLogged = localStorage.getItem('loggedIn');
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  const goToHome = async () => {
    const confirm = await warnMessage('You are not logged in', 'Go to Home');

    if (confirm) {
      navigate('/');
    }
  }

  useEffect(() => {
    getAllRooms()
    .then((data) => {
      setRooms(data.rooms);
    })
    .catch((err) => {
      console.warn(err);
      errorMessage(err?.error?._message || err?.message || err?.error?.message);
    });

  }, [isLogged]);

  return (
    <>
      <NavSideMenu />
      {
        isLogged && <Container>
        <h3>Rooms</h3>
        <Card>
          <Card.Body>
            <ul className="list-group list-group-flush">
              {
                rooms && rooms.map((room) => {
                  return (
                    <Link className="list-group-item list-group-item-action" to={`/rooms/${room._id}`} key={room._id}>{room.name}</Link>
                  );
                })
              }
            </ul>
          </Card.Body>
        </Card>
      </Container>
      }
    </>
  )
}

export default Rooms;