import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/User/Profile";
import getToken from "../utils/getToken";

const ProtectedRoute = () => {
  const token = getToken();
  const redirectTo = useNavigate();

  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        redirectTo("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [redirectTo, token]);

  return token ? (
    <Profile />
  ) : (
    <div>
      <h1>Accès refusé</h1>
      <p>
        Vous devez vous enregistrer pour pouvoir proposer un évènement. Vous
        allez être redirigé·e.
      </p>
    </div>
  );
};

export default ProtectedRoute;
