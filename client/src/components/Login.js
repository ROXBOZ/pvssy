import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { emailRegex } from "../utils/regexExpressions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const {
    login,
    handleInputChange,
    wrongPWMessage,
    isVisible,
    seePassword,
    inputValue,
  } = useContext(AuthContext);

  return (
    <div className="grid-area">
      <h1 className="centered">Se connecter</h1>

      <form className="centered grid-form">
        <div className="form-section">
          <label htmlFor="userEmail">Adresse Email</label>
          <input
            placeholder="Adresse Email"
            id="userEmail"
            type="text"
            name="userEmail"
            onChange={handleInputChange}
            className="line"
          />

          <label htmlFor="userPassword">Mot de passe</label>

          <div className="input-label-container fullwidth">
            <input
              placeholder="Mot de passe"
              type={isVisible ? "text" : "password"}
              id="userPassword"
              name="userPassword"
              onChange={handleInputChange}
              className=" line"
            />

            <button className="showPassword" onClick={seePassword}>
              <FontAwesomeIcon
                id="eye-icon"
                icon={isVisible ? faEye : faEyeSlash}
              />
            </button>
          </div>
        </div>
        {inputValue.userEmail && !emailRegex.test(inputValue.userEmail) && (
          <p className="msg error">L'adresse e-mail est invalide.</p>
        )}
        {wrongPWMessage && <p className="msg error">{wrongPWMessage}</p>}
        {inputValue.userPassword && inputValue.userPassword.length < 6 && (
          <p className="msg error">min 6 caractères.</p>
        )}
      </form>
      <div className="flex-center centered">
        <button
          className="centered submit-button"
          onClick={login}
          disabled={!emailRegex.test(inputValue.userEmail)}
        >
          Se connecter
        </button>

        <p className="centered">
          Pas encore inscrit·e ?{" "}
          <Link to="/creer-un-compte">Créer un compte</Link>.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
