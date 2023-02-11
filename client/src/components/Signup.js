import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <h1>Créer un compte</h1>

      <p>
        Déjà inscrit·e ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default Signup;
