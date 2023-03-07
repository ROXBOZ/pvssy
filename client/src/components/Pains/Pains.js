import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pains = () => {
  const { data, Error } = useContext(PainsContext);

  return (
    <div>
      <div className="heading-area">
        <p className="pretitle">Comprendre</p>
        <h2>Douleurs</h2>
      </div>
      <div className="card-grid">
        {data &&
          data.map((p) => {
            return (
              <Link
                className="link-card"
                to={{
                  pathname: `/se-soigner/douleurs/${p.name.toLowerCase()}`,
                }}
                key={p._id}
              >
                <div className="card">
                  <img src={p.img} alt={p.name} />
                  <h3>{p.name}</h3>
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
