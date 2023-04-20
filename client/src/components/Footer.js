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
              <Link to="https://www.facebook.com/pvssytalk/">Facebook</Link>
              <Link to="https://www.instagram.com/pvssy_talk/">Instagram</Link>
              <Link to="https://www.linkedin.com/company/pvssy-talk/">
                LinkedIn
              </Link>
            </div>
            <div className="nav-section">
              <a href="a-propos">À propos</a>
              <a href="mailto:info@pvssy-talk.org">Email</a>
              <a href="*">Newsletter</a>
            </div>
            <div className="nav-section">
              <Link to="conditions-generales">CGUV</Link>
              <Link to="*">presse kit</Link>
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
