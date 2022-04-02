import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

const NavSideMenu = () => {
  return (
    <>
      <Navbar bg="dark" expand={false} className="navbar-dark">
        <Container fluid>
          <div>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Link className="text-white navbar-brand" to="/">Dojo Chat</Link>
          </div>
          <div>
            <Link className="btn btn-outline-light" to="/login">Login</Link>
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