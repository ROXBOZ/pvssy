import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "./Breadcrumbs";
import getToken from "../utils/getToken";

const Header = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let storedToken = getToken();
    setToken(storedToken);
    console.log("token, 1st useEffect", token);
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      console.log("token, 2nd useEffect", token);
      console.log("isLoggedIn", isLoggedIn);
    } else {
      setIsLoggedIn(false);
      console.log("token, 2nd useEffect", token);
      console.log("isLoggedIn", isLoggedIn);
    }
  }, [token]);

  return (
    <header>
      <Link to="/" className="logo">
        pvssy talk
      </Link>

      <nav>
        <ul>
          <li>
            <NavLink to="a-propos">À propos</NavLink>
          </li>
          <li>
            <NavLink to="gerer-soi-meme">Gérer soi-même</NavLink>
          </li>
          <li>
            <NavLink to="trouver-de-l-aide">Trouver de l’aide</NavLink>
          </li>
          <li>
            <NavLink to="shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="agenda">Agenda</NavLink>
          </li>

          <li>
            {isLoggedIn && (
              <Link
                className="user-icon-link"
                to="/proposer-un-evenement"
                aria-label="profil"
              >
                <FontAwesomeIcon
                  className="user-icon"
                  id="userIcon"
                  icon={faUser}
                />
              </Link>
            )}

            {console.log("isLoggedIn in Body", isLoggedIn)}
            {isLoggedIn ? (
              <Link to="/logout">Se déconnecter</Link>
            ) : (
              <Link to="/login">Se connecter</Link>
            )}
          </li>
        </ul>
      </nav>
      <Breadcrumbs />
    </header>
  );
};

export default Header;
