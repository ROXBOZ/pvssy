import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";

const Header = () => {
  const { logout, userProfile } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };
  const handlStarterClick = () => {
    setIsOpen(false);
    window.location.href = "/#start";
  };

  const renderProfile = () => {
    if (userProfile) {
      return (
        <div className="profile-in-header">
          <Link to="/profile/ajouter" aria-label="profil">
            <div className="user-dot"></div>
            <span className="noun">{userProfile.userName}</span>
          </Link>
          <button onClick={logout}>se déconnecter</button>
        </div>
      );
    }

    return (
      <NavLink className="login" onClick={handleNavLinkClick} to="login">
        <button>Se connecter</button>
      </NavLink>
    );
  };

  return (
    <header>
      <Link to="/" className="logo" onClick={handleNavLinkClick}>
        pvssy talk <sup>beta</sup>
      </Link>
      <button className="burger-menu" onClick={toggleMenu}>
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
          {isOpen && (
            <li>
              <Link to="/#start" onClick={handlStarterClick}>
                Accueil
              </Link>
            </li>
          )}
          <li>
            <NavLink onClick={handleNavLinkClick} to="agenda">
              Agenda
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleNavLinkClick} to="faire-un-don">
              Faire un don
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleNavLinkClick} to="devenir-membre">
              Devenir membre
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleNavLinkClick} to="a-propos">
              À propos
            </NavLink>
          </li>
          <li>{renderProfile()}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
