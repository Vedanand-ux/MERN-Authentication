import React from 'react'
import { AppData } from '../context/AppContext';

export const Home = () => {

  const {logoutUser} = AppData();
  return (
    <div className = "flex w-100px m-auto mt-40">
      <div>home</div>
      <button className="bg-red-500 text-white p-2 rounded-md" onClick={logoutUser}>logout</button>
    </div>
  )
}

export default Home;
