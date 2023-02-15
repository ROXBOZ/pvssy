import React from "react";
import { Link } from "react-router-dom";

const PainCard = ({ p }) => {
  const id = p._id;
  const name = p.name;
  const def = p.def;
  const diag = p.diag;
  const sympt = p.sympt;
  const auto = p.auto;
  const pro = p.pro;
  const why = p.why;
  const terms = p.terms;

  const painDetail = {
    id,
    name,
    def,
    diag,
    sympt,
    pro,
    auto,
    why,
    terms,
  };

  return (
    <Link
      state={{ content: painDetail }}
      className="link-card"
      to={{ pathname: `/gerer-soi-meme/douleurs/${name.toLowerCase()}` }}
      key={id}
    >
      <div className="card">
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default PainCard;
