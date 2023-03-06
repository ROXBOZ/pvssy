import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pains = () => {
  const { data, Error, painData } = useContext(PainsContext);

  console.log("data :", data);

  return (
    <div>
      <h2>Douleurs</h2>
      <div className="card-grid">
        {data &&
          data.map((p) => {
            return (
              <Link
                className="link-card"
                to={{
                  pathname: `/gerer-soi-meme/douleurs/${p.name.toLowerCase()}`,
                }}
                key={p._id}
              >
                <div className="card">
                  <p>{p.name}</p>
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
