import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { emailRegex } from "../utils/regexExpressions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const { login, handleInputChange, wrongPWMessage, isVisible, seePassword } =
    useContext(AuthContext);
  const { inputValue } = useContext(AuthContext);

  return (
    <div className="grid-area">
      <h1 className="centered">Se connecter</h1>
      <form className="centered grid-form">
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
          {inputValue.userEmail && !emailRegex.test(inputValue.userEmail) && (
            <p className="msg error">L'adresse e-mail est invalide.</p>
          )}
        </div>
        <div className="user-password-label flex-center">
          <label htmlFor="userPassword">Mot de passe</label>
        </div>
        <div className="user-password-input">
          <input
            placeholder="Mot de passe"
            type={isVisible ? "text" : "password"}
            id="userPassword"
            name="userPassword"
            onChange={handleInputChange}
          />
        </div>

        <div className="user-password-error">
          <button className="showPassword" onClick={seePassword}>
            <FontAwesomeIcon
              id="eye-icon"
              icon={isVisible ? faEye : faEyeSlash}
            />
          </button>
          {wrongPWMessage && <p className="msg error">{wrongPWMessage}</p>}
          {inputValue.userPassword && inputValue.userPassword.length < 6 && (
            <p className="msg error">min 6 caractères.</p>
          )}
        </div>

        <div className="submit-button">
          <button
            onClick={login}
            disabled={!emailRegex.test(inputValue.userEmail)}
          >
            Se connecter
          </button>
        </div>
      </form>

      <p className="centered">
        Pas encore inscrit·e ?{" "}
        <Link to="/creer-un-compte">Créer un compte</Link>.
      </p>
    </div>
  );
}

export default LoginForm;
