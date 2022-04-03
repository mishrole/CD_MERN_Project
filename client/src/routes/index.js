import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../views/_home';
import Login from '../views/_login';
import NotFound from '../views/_notFound';
import Register from '../views/_register';
import Workspace from '../views/_workspace';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  )
}

export default Root;