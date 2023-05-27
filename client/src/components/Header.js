import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { motion } from "framer-motion";

const Header = () => {
  const { logout, userProfile } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
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

  const renderMenu = () => {
    return (
      <ul>
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
    );
  };

  return (
    <motion.header
      initial={{ y: "-10vh" }}
      animate={{ y: 0 }}
      transition={{
        delay: 0.5,
        duration: 0.75,
        type: "spring",
        stiffness: 70,
      }}
    >
      <Link to="/" className="logo">
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
      <nav className={isOpen ? "vertical" : "horizontal"}>{renderMenu()}</nav>
    </motion.header>
  );
};

export default Header;
