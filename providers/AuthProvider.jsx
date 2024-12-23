"use client"

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext("null");
const SetAuthContext = createContext("null");

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    if (savedAuth) {
      setAuth(savedAuth);
    }
  }, []);

  const saveAuth=(obj)=>{
      setAuth(obj);
      localStorage.setItem("auth",JSON.stringify(obj));
  }

  return (
    <AuthContext.Provider value={auth}>
      <SetAuthContext.Provider value={saveAuth}>
        {children}
      </SetAuthContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useSetAuth = () => {
  return useContext(SetAuthContext);
};
export default AuthProvider;
