import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const MoodBanner = () => {
    return (
      <div className="banner">
        <p>
          <span className="h4">
            Nous travaillons sur un annuaire de soignant·e·sx en Suisse Romande.
            Si tu connais des practicien·ne·sx <em>safe</em>, tu peux nous
            envoyer un email à{" "}
            <a href="mailto:hello@pvssy-talk.org">hello@pvssy-talk.org</a>
          </span>
        </p>
      </div>
    );
  };

  return (
    <>
      <MoodBanner />
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
            {/* <div className="footer-main-buttons-container">
              <button>devenir membre</button>
              <Link to="faire-un-don" style={{ border: "none" }}>
                <button>faire un don</button>
              </Link>
            </div> */}
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
                <Link to="conditions-generales">conditions générales</Link>
                <Link to="accessibilite">Accessibilité</Link>
                <Link to="*">crédits</Link>
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
