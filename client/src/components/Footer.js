import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <>
      {isHome && (
        <div class="banner">
          <p>
            <span className="h3">
              partager · témoigner · proposer · diffuser · échanger · discuter ·
              exprimer, informer · apprendre · soutenir · encourager ·
              sensibiliser · explorer · réfléchir · éduquer · inspirer ·
              influencer · défendre · promouvoir · célébrer · connecter · unir ·
              engager · agir ? Let’s <span className="logo">pvssy talk</span>!
            </span>
            <span className="h3">
              partager · témoigner · proposer · diffuser · échanger · discuter ·
              exprimer, informer · apprendre · soutenir · encourager ·
              sensibiliser · explorer · réfléchir · éduquer · inspirer ·
              influencer · défendre · promouvoir · célébrer · connecter · unir ·
              engager · agir ? Let’s <span className="logo">pvssy talk</span>!
            </span>
          </p>
        </div>
      )}

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
        <div className="footer-bottom">
          <p className="copyrights">© copyrights {currentYear}</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
