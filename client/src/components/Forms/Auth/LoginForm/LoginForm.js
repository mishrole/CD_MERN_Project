import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const LoginForm = (props) => {
  const { onSubmitProp } = props;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const emailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = (formData) => {
    const data = {
      email: formData.email,
      password: formData.password
    };

    onSubmitProp(data);
    console.log(data);
  }

  return (
    <Card>
      <Card.Body>
        <h1 className="brand text-center pt-3 pb-2 text-primary fw-bolder">Dojo Chat</h1>
        <form className="container py-5 px-4" onSubmit={handleSubmit(onSubmit)}>

          <div className="row align-items-center justify-content-center">
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-primary">Email</label>
              <input type="email" className="form-control" id="email" autoComplete="username"
              {...register(
                "email", {
                  required: {
                    value: true,
                    message: 'Email is required'
                  },
                  pattern: {
                    value: emailRegex,
                    message: 'Email is invalid'
                  } 
                }
              )}/>
              {
                errors.email && errors.email.type === "required" && <span role="alert" className="text-danger">{errors.email.message}</span>
              }
              {
                errors.email && errors.email.type === "pattern" && <span role="alert" className="text-danger">{errors.email.message}</span>
              }
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-primary">Password</label>
              <input type="password" className="form-control" id="password" autoComplete="current-password" 
              {...register(
                "password", {
                  required: true,
                  minLength: 8 
                }
              )}/>
              {
                errors.password && errors.password.type === "required" && <span role="alert" className="text-danger">Password is required</span>
              }
              {
                errors.password && errors.password.type === "minLength" && <span role="alert" className="text-danger">Password must be at least 8 characters</span>
              }
            </div>
          </div>
          
          {/* <div className="d-flex justify-content-end mb-4">
            <Link to="/" className="text-primary">Forgot password</Link>
          </div> */}

          <div className="d-flex flex-column mb-5">
            <button type="submit" className="btn btn-primary flex-fill">Sign In</button>
          </div>

          <div className="d-flex justify-content-center">
            <p className="text-mutted">Don't have an account yet? <Link to="/register" className="text-primary">Sign up</Link></p>
          </div>

        </form>
      </Card.Body>
    </Card>
  )
}

export default LoginForm;