import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-main">
        <div className="footer-column">
          <a
            href="mailto:info@pvssy-talk.org"
            className="h3"
            style={{ border: "none" }}
          >
            Let’s <span className="logo">pvssy talk</span>
             !
          </a>
          <div className="footer-main-buttons-container">
            <button>devenir membre</button>
            <Link to="faire-un-don" style={{ border: "none" }}>
              <button>faire un don</button>
            </Link>
          </div>
        </div>
        <div className="footer-column">
          <nav>
            <div className="nav-section">
              {/* <Link to="">devenir membre</Link>
              <Link to="faire-un-don">faire un don</Link> */}
              <Link to="">presse kit</Link>
              <Link to="conditions-generales">conditions générales</Link>
              <Link to="accessibilite">Accessibilité</Link>
              <Link to="/">crédits</Link>
            </div>
            <div className="nav-section">
              <a href="mailto:info@pvssy-talk.org">email</a>
              <Link to="https://www.facebook.com/pvssytalk/">facebook</Link>
              <Link to="https://www.instagram.com/pvssy_talk/">instagram</Link>
              <Link to="https://www.linkedin.com/company/pvssy-talk/">
                linkedIn
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyrights">© copyrights {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
