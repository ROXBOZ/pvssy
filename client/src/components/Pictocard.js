import React from "react";
import { Link } from "react-router-dom";

const Pictocard = ({ title, article }) => {
  return (
    <Link className="picto-link" to={article} alt={article}>
      <div className="picto-card">
        <img src={require(`../assets/images/picto-${article}.png`)} alt="" />
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

export default Pictocard;
