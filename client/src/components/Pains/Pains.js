import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pains = () => {
  const { data, Error } = useContext(PainsContext);

  return (
    <div>
      <h2>Douleurs</h2>
      <div className="card-grid">
        {data &&
          data.map((p) => {
            const id = p._id;
            const name = p.name;
            const def = p.def;
            const diag = p.diag;
            const sympt = p.sympt;
            const auto = p.auto;
            const pro = p.pro;
            const why = p.why;
            const painDetail = { id, name, def, diag, sympt, pro, auto, why };
            return (
              <Link
                state={{ content: painDetail }}
                className="link-card"
                to={{
                  pathname: `/gerer-soi-meme/douleurs/${name.toLowerCase()}`,
                }}
                key={id}
              >
                <div className="card">
                  <p>{name}</p>
                </div>
              </Link>
            );
          })}
      </div>
      {Error && <p>erreur</p>}
    </div>
  );
};

export default Pains;
