import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const EditProfileForm = (props) => {
  const { onSubmitProp, profile } = props;
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    setValue('firstname', profile.user.firstname);
    setValue('lastname', profile.user.lastname);
  }, [profile]);
  
  const onSubmit = (formData) => {
    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname
    };

    console.log(data);
    onSubmitProp(data);
  }

  return (
    <Card>
      <Card.Body>
        <h1 className="brand text-center pt-3 pb-2 text-primary fw-bolder">Edit Profile</h1>
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
                    },
                    defaultValue: profile.user.firstname
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
                    },
                    defaultValue: profile.user.lastname
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
                <input type="email" className="form-control" id="email" autoComplete="username" disabled value={ profile.user.email }/>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column mb-5">
            <button type="submit" className="btn btn-primary flex-fill">Update</button>
          </div>

        </form>
      </Card.Body>
    </Card>
  )
}

export default EditProfileForm;