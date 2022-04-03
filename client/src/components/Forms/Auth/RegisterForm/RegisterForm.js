import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm, useFormState, useWatch } from 'react-hook-form';

const RegisterForm = (props) => {
  const { onSubmitProp } = props;

  const { register, control, trigger, handleSubmit, formState: { errors } } = useForm();

  const emailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = (formData) => {
    const data = {
      email: formData.email,
      password: formData.password,
      confirm: formData.confirm,
      firstname: formData.firstname,
      lastname: formData.lastname,
      role: 'user'
    };

    onSubmitProp(data);
    console.log(data);
  }

  const { touchedFields } = useFormState({
    control,
  });

  const password = useWatch({ control, name: 'password' });

  const passwordInput = register(
    "password", {
      required: {
        value: true,
        message: 'Password is required'
      },
      minLength: {
        value: 8,
        message: 'Password requires at least 8 characters'
      }
    }
  )

  return (
    <Card>
      <Card.Body>
        <h1 className="brand text-center pt-3 pb-2 text-primary fw-bolder">Dojo Chat</h1>
        <form className="container py-5 px-4" onSubmit={handleSubmit(onSubmit)}>

          <div className="row align-items-center justify-content-center">
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label text-primary">First Name</label>
                <input type="text" className="form-control" id="firstname"
                {...register(
                  "firstname", {
                    required: {
                      value: true,
                      message: 'First Name is required'
                    },
                    minLength: {
                      value: 3,
                      message: 'First Name requires at least 3 characters'
                    }
                  }
                )}
                />
                {
                  errors.firstname && errors.firstname.type === "required" && <span role="alert" className="text-danger">{errors.firstname.message}</span>
                }
                {
                  errors.firstname && errors.firstname.type === "minLength" && <span role="alert" className="text-danger">{errors.firstname.message}</span>
                }
              </div>
            </div>

            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label text-primary">Last Name</label>
                <input type="text" className="form-control" id="lastname"
                {...register(
                  "lastname", {
                    required: {
                      value: true,
                      message: 'Last Name is required'
                    },
                    minLength: {
                      value: 3,
                      message: 'Last Name requires at least 3 characters'
                    }
                  }
                )}
                />
                {
                  errors.lastname && errors.lastname.type === "required" && <span role="alert" className="text-danger">{errors.lastname.message}</span>
                }
                {
                  errors.lastname && errors.lastname.type === "minLength" && <span role="alert" className="text-danger">{errors.lastname.message}</span>
                }
              </div>
            </div>
            
            <div className="col-12">
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
                )}
                />
                {
                  errors.email && errors.email.type === "required" && <span role="alert" className="text-danger">{errors.email.message}</span>
                }
                {
                  errors.email && errors.email.type === "pattern" && <span role="alert" className="text-danger">{errors.email.message}</span>
                }
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-primary">Password</label>
                <input className="form-control" id="password" autoComplete="current-password" type="password"
                  name={ passwordInput.name } onBlur={ passwordInput.onBlur } ref={ passwordInput.ref }
                  onChange={ async (e) => {
                    // ! `passwordInput.onChange` is a Promise, wait password value to be updated before triggering validation on confirmPassword
                    await passwordInput.onChange(e);
                    if (touchedFields.confirm || touchedFields.password) {
                      trigger("confirm");
                    }
                  }}
                />
                {
                  errors.password && errors.password.type === "required" && <span role="alert" className="text-danger">{errors.password.message}</span>
                }
                {
                  errors.password && errors.password.type === "minLength" && <span role="alert" className="text-danger">{errors.password.message}</span>
                }
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="confirm" className="form-label text-primary">Confirm Password</label>
                <input type="password" className="form-control" id="confirm" autoComplete="new-password" 
                {...register(
                  "confirm", {
                    validate: {
                      match: (value) => (password === value) || "Passwords do not match",
                      minLength: (value) => value.length > 0 || 'Confirm Password is required'
                    }
                  }
                )}/>
                {
                  errors.confirm && errors.confirm.type === "match" && <span role="alert" className="text-danger">{errors.confirm.message}</span>
                }
                {
                  errors.confirm && errors.confirm.type === "minLength" && <span role="alert" className="text-danger">{errors.confirm.message}</span>
                }
              </div>
            </div>
          </div>

          <div className="d-flex flex-column mb-5">
            <button type="submit" className="btn btn-primary flex-fill">Sign Up</button>
          </div>

          <div className="d-flex justify-content-center">
            <p className="text-mutted">Already have an account? <Link to="/login" className="text-primary">Sign in</Link></p>
          </div>

        </form>
      </Card.Body>
    </Card>
  )
}

export default RegisterForm;