import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import EditProfileForm from '../../../../components/Forms/User/EditProfileForm/EditProfileForm'
import NavSideMenu from '../../../../components/NavSideMenu/NavSideMenu'
import { editUser } from '../../../../helpers/users/editUser';
import { findCurrentUser } from '../../../../helpers/users/findCurrentUser'
import { errorMessage, successMessage } from '../../../../utils/SwalMessage'

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const goToNotFound = () => navigate('/not-found');

  useEffect(() => {
    findCurrentUser()
    .then(({ data }) => {
      if (!data) {
        goToNotFound();
      }
      console.warn('findCurrentUser', data);
      setUser(data);
      setLoaded(true);
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
  }, []);

  const onFormSubmit = (data) => {
    // const id = data.id;
    editUser(data)
    .then(({ data }) => {
      successMessage(`<p>Updated successfully!</p>`);
    })
    .catch((err) => {
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
    })
  }

  return (
    <>
    <NavSideMenu />
    <div>
    {
      errors.map((err, index) => <p key={index} className="text-danger">{err}</p>)
    }
    </div>
    {
      loaded &&
      <Container className="position-relative full-height">
        <EditProfileForm onSubmitProp={ onFormSubmit } profile={ user }/>
      </Container>
    }
    </>
  )
}

export default EditProfile