import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import getToken from "../utils/getToken";

const Header = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let storedToken = getToken();
    setToken(storedToken);
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
            <NavLink to={!token ? "login" : "logout"}>
              {!token ? "Se connecter" : "Se déconnecter"}
            </NavLink>
          </li>
        </ul>
      </nav>
      <Breadcrumbs />
    </header>
  );
};

export default Header;
