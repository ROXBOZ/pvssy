import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { useLocation } from "react-router-dom";
import { ScalableHeader } from "../../utils/scalableHeader";

const Pains = () => {
  const { data, Error } = useContext(PainsContext);
  const location = useLocation();
  const createTag = (appelation, index) => {
    return <tag key={index}>{appelation}</tag>;
  };

  const currentUrl = location.pathname;
  const endsWithDouleurs = /douleurs$/.test(currentUrl);

  return (
    <div>
      <div className="heading-area">
        <p className="pretitle">Comprendre</p>

        {endsWithDouleurs ? (
          <ScalableHeader title="Douleurs" headerLevel={1} />
        ) : (
          <ScalableHeader title="Douleurs" headerLevel={2} />
        )}

        <p className="subtitle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          sequi reiciendis, vel facere, esse eaque rerum velit labore
          reprehenderit quam, est veniam minus debitis quas quia in expedita
          ullam laborum!
        </p>
        {endsWithDouleurs ? (
          <ScalableHeader
            className="h3"
            title="Peux-tu orienter ta douleur ?"
            headerLevel={2}
          />
        ) : (
          <ScalableHeader
            title="Peux-tu orienter ta douleur ?"
            headerLevel={3}
          />
        )}

        <div className="tag-container">
          {createTag("vagin")}
          {createTag("clitoris ")}
          {createTag("vulve")}
          {createTag("anus")} | {createTag("règles")}
          {createTag("pénétration")}
        </div>
      </div>
      <div className="card-grid">
        {data &&
          data.map((p) => {
            return (
              <Link
                className="link-card"
                to={{
                  pathname: `/se-soigner/douleurs/${p.name.toLowerCase()}/medical`,
                }}
                key={p._id}
              >
                <div className="card">
                  <img src={p.img} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p style={{ backgroundColor: "red" }}>
                    <tag>Vagin</tag> <tag>Pénétration</tag>
                  </p>
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
