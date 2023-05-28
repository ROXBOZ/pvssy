import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-main">
          <div className="footer-column">
            <a
              className="h3"
              href="mailto:hello@pvssy-talk.org"
              style={{ border: "none" }}
            >
              Let’s <span className="logo">pvssy talk</span>
               !
            </a>
          </div>
          <div className="footer-column">
            <nav>
              <div className="nav-section">
                <a
                  href="https://drive.google.com/drive/folders/1l47TaPu9BNp-Qya2Ips7ovipUBmAejqu"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  presse kit
                </a>
                <Link className="acronym" to="conditions-generales">
                  CGUV
                </Link>
                <Link to="accessibilite">accessibilité</Link>
                <Link to="credits">crédits</Link>
              </div>

              <div className="nav-section">
                <a href="mailto:hello@pvssy-talk.org">email</a>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://www.facebook.com/pvssytalk/"
                >
                  facebook
                  <span className="screen-reader-text">
                    (ouvre un nouvel onglet)
                  </span>
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://www.instagram.com/pvssy_talk/"
                >
                  instagram
                  <span className="screen-reader-text">
                    (ouvre un nouvel onglet)
                  </span>
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://www.linkedin.com/company/pvssy-talk/"
                >
                  linkedIn
                  <span className="screen-reader-text">
                    (ouvre un nouvel onglet)
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
        {/* <div className="footer-bottom">
          <p className="smaller-text">© copyrights {currentYear}</p>
        </div> */}
      </footer>
    </>
  );
};

export default Footer;
