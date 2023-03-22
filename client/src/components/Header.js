import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../contexts/authContext";
import { useContext, useState } from "react";

const Header = () => {
  const { logout, userProfile } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleNavLink = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <Link to="/" className="logo">
        pvssy talk
      </Link>
      <button className="burger-menu" onClick={() => openMenu()}>
        <span id="nav-icon" className={!isOpen ? "close" : "open"}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="menu-label screen-reader-text">menu</span>
      </button>

      <nav className={isOpen ? "vertical" : "horizontal"}>
        <ul>
          <li>
            <NavLink className="hidden" onClick={handleNavLink} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleNavLink} to="a-propos">
              À propos
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleNavLink} to="se-soigner">
              Se soigner
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleNavLink} to="s-informer">
              S’informer
            </NavLink>
          </li>

          <li>
            <NavLink onClick={handleNavLink} to="agenda">
              Agenda
            </NavLink>
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
                  <p>{userProfile.userName}</p>
                </Link>
                <button onClick={logout}>se déconnecter</button>
              </div>
            ) : (
              <NavLink onClick={handleNavLink} to="login">
                Se connecter
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
