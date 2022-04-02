import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LoginForm from '../components/Forms/Auth/LoginForm/LoginForm';

const Login = () => {
  return (
    <div className="container position-relative container-full">
      <Row className="position-absolute top-0 end-0 start-0 bottom-0 m-0 justify-content-center align-items-center mx-auto">
        <Col md={9} lg={6} xl={5}>
          <LoginForm />
        </Col>
      </Row>
    </div>
  )
}

export default Login;