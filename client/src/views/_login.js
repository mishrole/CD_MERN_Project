import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../helpers/auth/login';
import { errorMessage } from '../utils/SwalMessage';
import LoginForm from '../components/Forms/Auth/LoginForm/LoginForm';

const Login = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onFormSubmit = (data) => {
    login(data)
    .then((response) => {
      // Set loggedIn to true
      localStorage.setItem( 'loggedIn', true );
      // Redirect to rooms list
      navigate('/rooms');
    })
    .catch((err) => {
      console.warn(err);
      const errors = err?.error?.errors;
      const errorArr = [];
      let errorsHTML = "";

      if (errors) {
        for (const key of Object.keys(errors)) {
          errorArr.push(errors[key].message);
          errorsHTML += `<p>${errors[key].message}</p>`;
        }
      }

      setErrors(errorArr);
      errorMessage(err?.error?._message || err?.message, errorsHTML || err?.error?.message);
    });
  }

  return (
    <div className="container position-relative container-full">
      <Row className="position-absolute top-0 end-0 start-0 bottom-0 m-0 justify-content-center align-items-center mx-auto">
        <Col md={9} lg={6} xl={5}>
          {
            errors.map((err, index) =>  <p key={index} className="text-danger">{err}</p>)
          }
          <LoginForm onSubmitProp={ onFormSubmit } />
        </Col>
      </Row>
    </div>
  )
}

export default Login;