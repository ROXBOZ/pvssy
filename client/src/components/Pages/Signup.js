import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex, urlRegex } from "../../utilities/regexExpressions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/authContext";
import { serverURL } from "../../utilities/serverURL";
import { Helmet } from "react-helmet";

const SignupForm = () => {
  const {
    handleInputChange,
    wrongPWMessage,
    isVisible,
    seePassword,
    inputValue,
  } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({});
  const [conditionsAccepted, setConditionsAccepted] = useState(null);
  const [message, setMessage] = useState("");

  const redirectTo = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      userName: newUser.userName,
      userEmail: newUser.userEmail,
      userWebsite: newUser.userWebsite,
      userPassword: newUser.userPassword,
      userIsAdmin: false,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        `${serverURL}/api/users/signup`,
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setMessage({
        type: "success",
        content: (
          <p className="msg success">
            Votre compte a été créé. Veuillez maintenant vous connecter.
          </p>
        ),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (message && message.type === "success") {
      setTimeout(() => {
        redirectTo("/login");
      }, 3000);
    }
  }, [message]);

  return (
    <div className="grid-area">
      <Helmet>
        <title>Créer un compte – Pvssy Talk</title>
      </Helmet>
      <h1 className="centered">Créer un compte</h1>

      <form className="centered grid-form">
        <div className="form-section">
          <label htmlFor="userName">Nom *</label>
          <input
            name="userName"
            id="userName"
            type="text"
            placeholder="Nom"
            onChange={handleInputChange}
            className="line"
            required
          />
          <label htmlFor="userEmail">Adresse Email *</label>
          <input
            placeholder="Adresse Email"
            id="userEmail"
            type="text"
            name="userEmail"
            onChange={handleInputChange}
            required
            className="line"
          />
          <label htmlFor="userWebsite">Site internet</label>
          <input
            name="userWebsite"
            id="userWebsite"
            type="text"
            placeholder="https://..."
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
        <div className="msg-box">
          {inputValue.userName && inputValue.userName.length < 2 && (
            <p className="msg error">Le nom doit avoir au moins 2 lettres.</p>
          )}
          {inputValue.userEmail && !emailRegex.test(inputValue.userEmail) && (
            <p className="msg error">L'adresse e-mail est invalide.</p>
          )}
          {inputValue.userWebsite && !urlRegex.test(inputValue.userWebsite) && (
            <li className="error msg">L’URL du site internet est invalide.</li>
          )}
          {wrongPWMessage && <p className="msg error">{wrongPWMessage}</p>}
          {inputValue.userPassword && inputValue.userPassword.length < 6 && (
            <p className="msg error">Mot de passe min. 6 caractères.</p>
          )}
        </div>
      </form>

      <div className="centered">
        <input
          className="form-check-input"
          id="conditionsCheckbox"
          type="checkbox"
          onChange={(e) => setConditionsAccepted(e.target.checked)}
          required
        />
        <label htmlFor="conditionsCheckbox">
          J’ai lu et j’accepte les{" "}
          <Link to="/conditions-generales ">conditions générales</Link>.
        </label>
      </div>
      <div className="flex-center centered">
        <button
          onClick={signup}
          disabled={
            !(inputValue.userPassword &&
            inputValue.userPassword > 6 &&
            inputValue.userName &&
            inputValue.userName >= 2 &&
            inputValue.Website
              ? urlRegex.test(inputValue.userWebsite)
              : true && conditionsAccepted)
          }
        >
          Créer un compte
        </button>
        <p>
          Déjà inscrit·e ? <Link to="/login">Se connecter</Link>.
        </p>
      </div>

      {message && (
        <div className={`message ${message.type}`}>{message.content}</div>
      )}
    </div>
  );
};

export default SignupForm;
