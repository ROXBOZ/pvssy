import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-main">
        <div className="footer-column">
          <p className="h3">
            Let’s <span className="logo">pvssy talk</span> !
          </p>
          <div className="footer-main-buttons-container">
            <button>newsletter</button>
            <button>faire un don</button>
          </div>
        </div>
        <div className="footer-column">
          <nav>
            <div className="nav-section">
              <Link to="a-propos">à propos</Link>
              <Link to="*">devenir membre</Link>
              <Link to="*">presse kit</Link>
              <Link to="conditions-generales">conditions générales</Link>
            </div>
            <div className="nav-section">
              <a href="mailto:info@pvssy-talk.org">Email</a>
              <Link to="https://www.facebook.com/pvssytalk/">Facebook</Link>
              <Link to="https://www.instagram.com/pvssy_talk/">Instagram</Link>
              <Link to="https://www.linkedin.com/company/pvssy-talk/">
                LinkedIn
              </Link>
            </div>
            <div className="nav-section">
              <Link to="/">confidentialité</Link>
              <Link to="/">crédits</Link>
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
