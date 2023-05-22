import React, { useState } from "react";
import { Link } from "react-router-dom";

const LogoPartner = ({ url, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered((prevState) => !prevState);
  };

  return (
    <Link
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className="logo-partner"
      to={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        src={require(`../assets/images/partners/${name
          .replaceAll(" ", "-")
          .toLowerCase()}.${isHovered ? "jpg" : "png"}`)}
        alt={name}
      />
    </Link>
  );
};

export default LogoPartner;
