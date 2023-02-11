import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Se connecter</h1>
      <p>
        Pas encore inscrit·e ? <Link to="/signup">Créer un compte</Link>
      </p>
    </div>
  );
};

export default Login;
