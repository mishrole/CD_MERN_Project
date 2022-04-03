import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { errorMessage, successMessage } from '../../utils/SwalMessage';
import { logout } from '../../helpers/auth/logout';

const NavSideMenu = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('loggedIn');

  const logOut = () => {
    logout()
    .then((response) => {
      successMessage(response.data.message);
      localStorage.removeItem('loggedIn');
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
              !loggedIn ? 
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
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}

export default NavSideMenu;