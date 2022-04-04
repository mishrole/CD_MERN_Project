import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { errorMessage, successMessage } from '../../utils/SwalMessage';
import { logout } from '../../helpers/auth/logout';
import MainContext from '../../context/SocketContext';

const NavSideMenu = () => {
  const isLogged = localStorage.getItem('loggedIn');
  const [socket] = useContext(MainContext);
  const navigate = useNavigate();

  const logOut = () => {
    logout()
    .then((response) => {
      successMessage(response.data.message);
      socket.emit('disconnected');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userId');
      navigate('/login');
    })
    .catch((err) => {
      errorMessage(err?.error?._message || err?.message || err?.error?.message);
    });
  }

  return (
    <>
      <Navbar bg="dark" expand={false} className="navbar-dark">
        <Container fluid>
          <div>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Link className="text-white navbar-brand" to="/">Dojo Chat</Link>
          </div>
          <div>
            {
              !isLogged ? 
              <Link className="btn btn-outline-light" to="/login">Login</Link>
              :
              <Button variant="outline-danger" onClick={logOut}>Logout</Button>
            }
          </div>
          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" className="bg-semi">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">Dojo Chat</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to="/" className="nav-link">Home</Link>
                {
                  isLogged ? <>
                  <Link to="/rooms" className="nav-link">Rooms</Link>
                  </> : ''
                }
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}

export default NavSideMenu;