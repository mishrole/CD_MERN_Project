import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import NavSideMenu from './../components/NavSideMenu/NavSideMenu';
import brainstorming from './../assets/img/svg/manypixels_Brainstorming-session_Monochromatic.svg';
import ranking from './../assets/img/svg/manypixels_Ranking_Monochromatic.svg';
import teambuilding from './../assets/img/svg/manypixels_Team-building_Monochromatic.svg';
import progress from './../assets/img/svg/manypixels_Progress_Monochromatic.svg';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const isLogged = localStorage.getItem('loggedIn');

  return (
    <>
      <NavSideMenu />

      <Container className="py-5">
        <Row className="justify-content-center align-items-center">
          <Image className="img-fluid col-lg-8 py-5" src={ brainstorming } alt="People brainstorming"></Image>
          <Col lg={4} className="py-5">
            <Row>
              <Col className="col-9 col-lg-12 mx-auto text-center text-lg-start">
                <h2 className="pb-2 px-2 px-lg-0">Team Collaboration like never before</h2>
                <p>Chat, organize, and collaborate with instant messaging across multiple teams. Plan your study sessions, coding projects, and more</p>
                <div className="py-3">
                  <Link className="btn btn-primary" to={!isLogged ? '/register' : '/workspace'}>Get Started</Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <div className="container-fluid py-4">
        <Row className="justify-content-center align-items-center bg-blue py-4">
          <Col xs={8} className="py-4">
            <Row className="align-items-center justify-content-center">
              <Col md={6} className="py-2">
                <h3 className="text-center text-lg-start">Contribute to build a better community for everyone to learn and grow</h3>
                <p></p>
              </Col>
              <Col md={6} className="py-2">
                <div className="d-flex justify-content-end align-items-center">
                <Image className="img-fluid" src={ ranking } alt="People building a ranking"></Image>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center bg-gray py-4">
          <Col xs={8} className="py-4">
            <Row className="align-items-center justify-content-center flex-md-row-reverse">
              <Col md={6} className="py-2">
                <h3 className="text-center text-lg-start">Build the perfect environment to open discussion about IT topics</h3>
                <p></p>
              </Col>
              <Col md={6} className="py-2">
                <div className="d-flex justify-content-start align-items-center">
                <Image className="img-fluid" src={ teambuilding } alt="People building a board with metrics"></Image>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center bg-blue py-4">
          <Col xs={8} className="py-4">
            <Row className="align-items-center justify-content-center">
              <Col md={6} className="py-2">
                <h3 className="text-center text-lg-start">Share your achievements with everyone and get instant feedback</h3>
                <p></p>
              </Col>
              <Col md={6} className="py-2">
                <div className="d-flex justify-content-end align-items-center">
                <Image className="img-fluid" src={ progress } alt="People analyzing data"></Image>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center py-5">
          <Col xs={8} className="py-5">
            <h3 className="text-center py-5">✨ Ready to start your journey? ✨</h3>
            <div className="d-flex justify-content-center align-items-center">
              <Link className="btn btn-lg btn-primary" to={!isLogged ? '/register' : '/workspace'}>Get Started</Link>
            </div>
          </Col>
        </Row>
      </div>

      <Footer/>
    </>
  )
}

export default Home;