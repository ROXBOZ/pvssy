import React from "react";
import { Link } from "react-router-dom";

const Pictocard = ({ article }) => {
  return (
    <Link className="picto-link" to={article} alt={article}>
      {console.log("article ", article)}
      <div className="picto-card">
        <img src={require(`../assets/images/picto-${article}.png`)} alt="" />
        <h3>{article}</h3>
      </div>
    </Link>
  );
};

export default Pictocard;
