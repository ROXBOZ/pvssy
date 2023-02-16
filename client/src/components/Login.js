import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [loginUser, setLoginUser] = useState({});

  const handleInputChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  console.log("loginUser", loginUser);

  const login = () => {
    //TODO Check email format, password lenght ...avoid making useless requests to the server
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

    fetch("http://localhost:5000/api/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        if (result.token) {
          console.log("result.token", result.token);
          localStorage.setItem("token", result.token);
          setLoginUser(result.user);
        }
      })
      .catch((error) => console.log("error", error));
  };

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
        <div className="submit-button">
          <button onClick={login}>Se connecter</button>
          {/* <button onClick={logout}>Se déconnecter</button> */}
        </div>
      </form>

      <p>
        Mot de passe perdu ? <Link to="/">Renouveler le mot de passe</Link>.
        <br />
        Pas encore inscrit·e ?{" "}
        <Link to="/creer-un-compte">Créer un compte</Link>.
      </p>
    </div>
  );
}

export default LoginForm;
