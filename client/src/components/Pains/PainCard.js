import React from "react";
import { Link } from "react-router-dom";

const PainCard = ({ p }) => {
  const id = p.id;
  const name = p.name;
  const def = p.def;

  const painDetail = {
    id,
    name,
    def,
  };

  return (
    <Link
      state={{ content: painDetail }}
      className="link-card"
      to={{ pathname: `/douleurs/${name.toLowerCase()}` }}
      key={id}
    >
      <div className="pain-card">
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default PainCard;
