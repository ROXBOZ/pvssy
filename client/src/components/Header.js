import React from "react";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        pvssy talk
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="agir">Agir & comprendre</NavLink>
          </li>

          <li>
            <NavLink to="ressources">Ressources</NavLink>
          </li>
          <li>
            <NavLink to="shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="agenda">Agenda</NavLink>
          </li>
          <li>
            <NavLink to="a-propos">À propos</NavLink>
          </li>
        </ul>

        {/* <button>s'enregistrer</button> */}
      </nav>
    </header>
  );
};

export default Header;
