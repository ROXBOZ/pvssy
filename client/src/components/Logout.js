import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Logout = () => {
  const redirectTo = useNavigate();
  const { setUser } = useContext(AuthContext);

  const logout = (e) => {
    localStorage.removeItem("token");
    setUser("");
  };

  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      redirectTo("/login");
    }, 0);
    return () => clearTimeout(timer);
  }, [redirectTo]);

  return <h1>Déconnexion</h1>;
};

export default Logout;
