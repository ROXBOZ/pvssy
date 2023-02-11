import React from "react";
import { Link, NavLink } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
const Header = () => {
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
            <NavLink className="btn" to="login">
              Se connecter
            </NavLink>
          </li>
        </ul>
      </nav>
      <Breadcrumbs />
    </header>
  );
};

export default Header;
