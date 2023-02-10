import React from "react";
import { Link } from "react-router-dom";

const PainCard = ({ p }) => {
  const id = p._id;
  const name = p.name;
  const def = p.def;
  const diag = p.diagnostic;
  const sympt = p.symptomes;
  const aides = p.aides;
  const auto = p.auto;

  const painDetail = {
    id,
    name,
    def,
    diag,
    sympt,
    aides,
    auto,
  };

  return (
    <Link
      state={{ content: painDetail }}
      className="link-card"
      to={{ pathname: `/douleurs/${name.toLowerCase()}` }}
      key={id}
    >
      <div className="card">
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default PainCard;
