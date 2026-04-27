import React from 'react'
import { AppData } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const {logoutUser} = AppData();
  const navigate = useNavigate();
  return (
    <div className = "flex w-100px m-auto mt-40">
      <div>home</div>
      <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => logoutUser(navigate)}>logout</button>
    </div>
  )
}

export default Home;
