import React from 'react'
import { AppData } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const {logoutUser} = AppData();
  const navigate = useNavigate();
  return (

  )
}

export default Home;
