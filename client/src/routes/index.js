import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../views/_home';
import NotFound from '../views/_notFound';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/register" element={<h1>Register</h1>} />
      <Route path="/workspace" element={<h1>Workspace</h1>} />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  )
}

export default Root;