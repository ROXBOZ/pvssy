import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import getToken from "../utils/getToken";

function LoginForm() {
  const [loginUser, setLoginUser] = useState({});
  const { isLoggedIn, user } = useContext(AuthContext);
  const redirectTo = useNavigate();
  const handleInputChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userEmail", loginUser.userEmail);
    urlencoded.append("userPassword", loginUser.userPassword);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        requestOptions
      );
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        setLoginUser(result.user);
        redirectTo("/profile");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <div>
      <h1>Se connecter</h1>

      <form className="grid-form">
        <div className="user-email-label">
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
          <div className="user-email-requirements">
            {/* FIXME */}
            {/* {loginUser.userEmail &&
              (!loginUser.userEmail.includes("@") ||
                !loginUser.userEmail.includes(".")) && (
                <span>L’adresse Email semble invalide</span>
              )} */}
          </div>
        </div>
        <div className="user-password-label">
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
        {/* FIXME */}
        {/* <div className="user-password-requirements">
          {loginUser.userPassword && loginUser.userPassword.length < 6 && (
            <span>min. 6 charactères</span>
          )}
        </div> */}
        <div className="submit-button">
          {/* FIXME */}
          <button
            onClick={login}
            // disabled={
            //   (loginUser.userEmail &&
            //     (!loginUser.userEmail.includes("@") ||
            //       !loginUser.userEmail.includes("."))) ||
            //   (loginUser.userPassword && loginUser.userPassword.length < 6)
            //     ? true
            //     : false
            // }
          >
            Se connecter
          </button>
        </div>
      </form>

      <p>
        {/* Mot de passe perdu ? <Link to="/">Renouveler le mot de passe</Link>.
        <br /> */}
        Pas encore inscrit·e ?{" "}
        <Link to="/creer-un-compte">Créer un compte</Link>.
      </p>
    </div>
  );
}

export default LoginForm;
