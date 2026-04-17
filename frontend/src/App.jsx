import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import {ToastContainer} from 'react-toastify';

const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  </>;
};

export default App;