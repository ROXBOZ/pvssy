import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { emailRegex } from "../../utilities/regexExpressions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

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
    <div>
      <Helmet>
        <title>Se connecter – Pvssy Talk</title>
      </Helmet>

      <div className="title-aside-container">
        <h1>Se connecter</h1>
        <div>
          <form>
            <div className="input-label-container">
              <label htmlFor="userEmail">Adresse Email</label>
              <input
                placeholder="Adresse Email"
                id="userEmail"
                type="text"
                name="userEmail"
                onChange={handleInputChange}
                className="line"
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="userPassword">Mot de passe</label>
              <input
                placeholder="Mot de passe"
                type={isVisible ? "text" : "password"}
                id="userPassword"
                name="userPassword"
                onChange={handleInputChange}
                className="line"
              />
              <button className="showPassword" onClick={seePassword}>
                <FontAwesomeIcon
                  id="eye-icon"
                  icon={isVisible ? faEye : faEyeSlash}
                />
              </button>
            </div>

            {inputValue.userEmail && !emailRegex.test(inputValue.userEmail) && (
              <p className="msg error">L'adresse e-mail est invalide.</p>
            )}
            {wrongPWMessage && <p className="msg error">{wrongPWMessage}</p>}
            {inputValue.userPassword && inputValue.userPassword.length < 6 && (
              <p className="msg error">min 6 caractères.</p>
            )}
          </form>

          <div className="flex-center">
            <button
              className=" submit-button"
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
      </div>
    </div>
  );
}

export default LoginForm;
