import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { warnMessage } from '../utils/SwalMessage';
import NavSideMenu from '../components/NavSideMenu/NavSideMenu';

const Rooms = () => {
  const isLogged = localStorage.getItem('loggedIn');
  const navigate = useNavigate();

  const goToHome = async () => {
    const confirm = await warnMessage('You are not logged in', 'Go to Login page');

    if (confirm) {
      navigate('/login');
    }

  }

  useEffect(() => {
    if (!isLogged) {
      goToHome();
    }
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
              <Link className="list-group-item list-group-item-action" to="/rooms/global">Global</Link>
              <Link className="list-group-item list-group-item-action" to="/rooms/mern">MERN</Link>
              <Link className="list-group-item list-group-item-action" to="/rooms/python">Python</Link>
              <Link className="list-group-item list-group-item-action" to="/rooms/java">Java</Link>
            </ul>
          </Card.Body>
        </Card>
      </Container>
      }
    </>
  )
}

export default Rooms;