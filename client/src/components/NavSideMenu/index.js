import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

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
              {/* <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}

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