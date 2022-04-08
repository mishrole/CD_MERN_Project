import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { errorMessage } from '../../utils/SwalMessage';
import userImag from './../../assets/img/svg/undraw_male_avatar.svg';
import { getUser } from '../../helpers/users/getUser';

const ShowUserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const goToNotFound = () => navigate('/not-found');

  useEffect(() => {
    getUser(userId)
    .then(({ data }) => {
      if (!data) {
        goToNotFound();
      }
      setUser(data.user);
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
    })

  }, [userId]);

  return (
    <>
      {
        loaded && <Container className="position-relative full-height">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="row justify-content-center align-items-center">
            <div className="col-4">
              <img src={userImag} alt="user" className="img-fluid rounded-circle" />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <h5 className="m-0 pt-4">{ user.firstname } { user.lastname}</h5>
            
          </div>
        </div>
        </Container>
      }
    </>
  )
}

export default ShowUserProfile;