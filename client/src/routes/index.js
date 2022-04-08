import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainContextProvider } from '../context/SocketContext';
// import ListAllRooms from '../views/modules/_admin/_rooms/_allRooms';
import EditProfile from '../views/modules/_public/_profile/_editProfile';
import Profile from '../views/modules/_public/_profile/_profile';
import Home from '../views/_home';
import Login from '../views/_login';
import NotFound from '../views/_notFound';
import Register from '../views/_register';
import Room from '../views/_room';
import Rooms from '../views/_rooms';

const Root = () => {
  const isLogged = localStorage.getItem('loggedIn');

  return (
    <MainContextProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={ <Home /> } />
        {/* TODO: Fix redirection on Logout */}
        <Route path="/login" element={!isLogged ? <Login /> : <Navigate to="/rooms" replace />} />
        <Route path="/register" element={!isLogged ? <Register /> : <Navigate to="/rooms" replace />} />
        {/* <Route path="/login" element={ <Login /> } /> */}
        {/* <Route path="/register" element={ <Register /> } /> */}

        {/* All Users */}
        <Route path="/profile" element={ <EditProfile />}/>
        <Route path="/profile/:userId" element={ <Profile/> } />
        <Route path="/rooms" element={ <Rooms/> }/>
        <Route path="/rooms/:name" element={ <Room /> }/>
        {/* Admin only */}
        {/* <Route path="/admin/rooms" element={<ListAllRooms />} /> */}
        {/* Not Found */}
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </MainContextProvider>
  )
}

export default Root;