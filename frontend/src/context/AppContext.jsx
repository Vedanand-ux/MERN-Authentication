import { createContext, useEffect, useState } from "react";
import { server } from "../main";
import axios from "axios";

const AppConst = createContext(null)

export const AppProvider = ({children}) =>{
  const [user, setUser ] =useState(null);
  const [loading, setLoading ] =useState(true);
  const [isAuth, setIsAuth ] =useState(false);
   
  async function fetchUser(params){

    setLoading(true);
    try{
      const  {data} = await axios.get(`${server}/api/v1/me`,{
        withCredentials: true,
      });
      setUser(data);
      setIsAuth(true);
      setLoading(false);

    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchUser();
  },[]);

  return <AppContext.AppProvider values={{ setIsAuth, isAuth, user, setUser, loading }}>{children}</AppContext.AppProvider>
};

export const AppData = () =>{
  const context = useContext(AppContext);

  if(!context) throw new Error("AppContext must be used within AppProvider");
  return context;
}

