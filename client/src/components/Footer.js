import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as InstagramIcon } from "../assets/images/instagram.svg";
import { ReactComponent as FacebookIcon } from "../assets/images/facebook.svg";
import { ReactComponent as LinkedInIcon } from "../assets/images/linkedin.svg";
import { ReactComponent as EmailIcon } from "../assets/images/email.svg";
import { ReactComponent as MailChimpIcon } from "../assets/images/mailchimp.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // const SocialMediaLink = ({ icon: Icon, name, to }) => {
  //   return (
  //     <a
  //       className="tooltip"
  //       href={to}
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       <Icon />
  //       <span className="screen-reader-text">
  //         (ouvre un nouvel onglet, redirection vers {name})
  //       </span>
  //       <p className="tooltiptext">{name}</p>
  //     </a>
  //   );
  // };

  return (
    <footer>
      <div className="footer-main">
        <div className="footer-main-col">
          <p className="h2">
            Let’s <span className="logo">pvssy talk</span> !
          </p>
          <div className="footer-main-buttons-container">
            <button>inscription newsletter</button>
            <button>faire un don</button>
          </div>
        </div>
        <div className="footer-main-col">
          <nav>
            <div className="nav-section">
              <Link to="a-propos">à propos</Link>
              <Link to="*">devenir membre</Link>
              <Link to="*">presse kit</Link>
              <Link to="conditions-generales">conditions générales</Link>
            </div>
            <div className="nav-section">
              <Link to="*">contact</Link>
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
        {/* <p className="h4">
          Let’s <span className="logo">pvssy talk</span> !
        </p> */}
        {/* <div className="social-medias">
          <SocialMediaLink
            icon={InstagramIcon}
            name="Instagram"
            to="https://www.instagram.com/pvssy_talk/"
          />
          <SocialMediaLink
            icon={FacebookIcon}
            name="Facebook"
            to="https://www.facebook.com/pvssytalk/"
          />
          <SocialMediaLink
            icon={LinkedInIcon}
            name="LinkedIn"
            to="https://www.linkedin.com/company/pvssy-talk/"
          />
          <SocialMediaLink icon={MailChimpIcon} name="Newsletter" to="/" />
          <SocialMediaLink
            icon={EmailIcon}
            name="Email"
            to="mailto:info@pvssy-talk.org"
          />
        </div> */}
        <p className="copyrights">© copyrights {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
