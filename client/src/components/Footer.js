import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      Contact ... <br />
      <Link to="se-soigner/ressources">Ressources</Link> et autres liens directs
      <br />© ...
    </footer>
  );
};

export default Footer;
