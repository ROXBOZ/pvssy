import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";

const Logout = () => {
  let token = getToken();
  const redirectTo = useNavigate();

  const logout = (e) => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      redirectTo("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [redirectTo]);

  return <h1>Déconnexion</h1>;
};

export default Logout;
