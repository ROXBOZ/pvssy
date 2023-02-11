import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      Contact ... <br />
      <Link to="gerer-soi-meme/ressources">Ressources</Link> et autres liens
      directs
      <br />© ...
    </footer>
  );
};

export default Footer;
