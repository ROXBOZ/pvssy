import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "./Breadcrumbs";

import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

const Header = () => {
  const { user, isLoggedIn, userProfile } = useContext(AuthContext);
  console.log("isLoggedIn >>>", isLoggedIn);

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
            {isLoggedIn ? (
              <>
                <Link
                  className="user-icon-link"
                  to="/profile"
                  aria-label="profil"
                >
                  <FontAwesomeIcon
                    className="user-icon"
                    id="userIcon"
                    icon={faUser}
                  />
                </Link>
                <Link to="/logout">se déconnecter</Link>
              </>
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
