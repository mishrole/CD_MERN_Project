import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainContextProvider } from '../context/SocketContext';
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isLogged ? <Login /> : <Navigate to="/rooms" replace />} />
        <Route path="/register" element={!isLogged ? <Register /> : <Navigate to="/rooms" replace />} />
        <Route path="/rooms" element={ <Rooms/> }/>
        <Route path="/rooms/:name" element={<Room />}/>
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </MainContextProvider>
  )
}

export default Root;