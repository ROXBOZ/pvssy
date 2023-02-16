import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Se connecter</h1>

      <form className="grid-form">
        <div className="user-email-label">
          <label htmlFor="userEmail">Adresse Email</label>
        </div>
        <div className="user-email-input">
          <input
            placeholder="Adresse email"
            id="userEmail"
            type="text"
            name="userEmail"
            // onChange={handleInputChange}
          />
        </div>
        <div className="user-password-label">
          <label htmlFor="userPassword">Mot de passe</label>
        </div>
        <div className="user-password-input">
          <input
            placeholder="Mot de passe"
            type="text"
            id="userPassword"
            name="userPassword"
            // onChange={handleInputChange}
          />
        </div>
        <div className="submit-button">
          <button>Se connecter</button>
        </div>
      </form>

      <p>
        Pas encore inscrit·e ?{" "}
        <Link to="/creer-un-compte">Créer un compte</Link>
      </p>
    </div>
  );
};

export default Login;
