import { createContext, useEffect, useState, useContext } from "react";
import { server } from "../main";
import axios from "axios";
import api from "../apiIntercepter";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  async function fetchUser() {
    setLoading(true);
    try {
      const { data } = await api.get(`api/v1/me`);

      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{ isAuth, setIsAuth, user, setUser, loading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppData = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within AppProvider");
  }

  return context;
};