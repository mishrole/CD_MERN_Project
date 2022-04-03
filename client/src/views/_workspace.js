import React, { useEffect, useState } from 'react';
import { allUsers } from '../helpers/users/allUsers';
import { errorMessage } from '../utils/SwalMessage';
import { Container } from 'react-bootstrap';
import NavSideMenu from '../components/NavSideMenu/NavSideMenu';
import Chat from '../components/Chat/Chat';

const Workspace = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    allUsers()
    .then((response) => {
      console.log(response);
      setUsers(response.data?.users);
    })
    .catch((err) => {
      errorMessage(err?.error?._message || err?.message || err?.error?.message);
    });
  }, []);
  
  return (
    <>
    <NavSideMenu />
    <Container>
      <p>Workspace</p>
      <ul>
        {
          users.map((user) => {
            return (
              <li key={user._id}>{user.email}</li>
            )
          })
        }
      </ul>
      <Chat />
    </Container>
    </>
  )
}

export default Workspace;