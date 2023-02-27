import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function LoginForm() {
  const { login, handleInputChange } = useContext(AuthContext);

  return (
    <div>
      <h1>Se connecter</h1>
      <form className="grid-form">
        <div className="user-email-label flex-center">
          <label htmlFor="userEmail">Adresse Email </label>
        </div>
        <div className="user-email-input">
          <input
            placeholder="Adresse email"
            id="userEmail"
            type="text"
            name="userEmail"
            onChange={handleInputChange}
          />
        </div>
        <div className="user-email-requirements">
          <div className="user-email-requirements">{/* TODO */}</div>
        </div>
        <div className="user-password-label flex-center">
          <label htmlFor="userPassword">Mot de passe</label>
        </div>
        <div className="user-password-input">
          <input
            placeholder="Mot de passe"
            type="password"
            id="userPassword"
            name="userPassword"
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="user-password-requirements"> */}
        {/* TODO */}
        {/* </div> */}
        <div className="submit-button">
          <button onClick={login}>Se connecter</button>
        </div>
      </form>

      <p>
        Pas encore inscrit·e ?{" "}
        <Link to="/creer-un-compte">Créer un compte</Link>.
      </p>
    </div>
  );
}

export default LoginForm;
