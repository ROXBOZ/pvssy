import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "./Breadcrumbs";

import { AuthContext } from "../contexts/authContext";
import { useContext, useState } from "react";

const Header = () => {
  const { logout, userProfile } = useContext(AuthContext);
  const [verticalMenu, setVerticalMenu] = useState(false);

  const openMenu = () => {
    setVerticalMenu(!verticalMenu);
  };

  return (
    <header>
      <button class="burger-menu" aria-label="Menu" onClick={openMenu}>
        menu
      </button>
      <Link to="/" className="logo">
        pvssy talk
      </Link>

      <nav className={verticalMenu === true ? "vertical" : "horizontal"}>
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
            {userProfile ? (
              <div className="logout-header">
                <Link
                  className="user-icon-link"
                  to="/profile/ajouter"
                  aria-label="profil"
                >
                  <FontAwesomeIcon
                    className="user-icon"
                    id="userIcon"
                    icon={faUser}
                  />
                </Link>
                <button onClick={logout}>se déconnecter</button>
              </div>
            ) : (
              <Link to="/login">se connecter</Link>
            )}
          </li>
        </ul>
      </nav>
      <Breadcrumbs />
    </header>
  );
};

export default Header;
