import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as InstagramIcon } from "../assets/images/instagram.svg";
import { ReactComponent as FacebookIcon } from "../assets/images/facebook.svg";
import { ReactComponent as LinkedInIcon } from "../assets/images/linkedin.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const SocialMediaLink = ({ icon: Icon, name, to }) => {
    return (
      <Link target="_blank" to={to}>
        <Icon />
        <span className="screen-reader-text">
          (ouvre un nouvel onglet, redirection vers {name})
        </span>
      </Link>
    );
  };

  return (
    <footer>
      <div className="footer-content">
        <h2 className="h4">
          Let’s <span className="logo">pvssy talk</span> !
        </h2>
        <div className="social-medias">
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
        </div>
      </div>

      <p className="copyrights">© Pvssy Talk, {currentYear}</p>
    </footer>
  );
};

export default Footer;
