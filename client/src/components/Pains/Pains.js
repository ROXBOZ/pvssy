import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { useLocation } from "react-router-dom";
import { HeadingArea } from "../../utils/HeadingArea";

const Pains = () => {
  const { data, Error } = useContext(PainsContext);
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithDouleurs = /douleurs$/.test(currentUrl);
  const createTag = (appelation, index) => {
    return <tag key={index}>{appelation}</tag>;
  };

  return (
    <div>
      {endsWithDouleurs && (
        <HeadingArea
          pretitle="Comprendre"
          title="Douleurs"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          sequi reiciendis, vel facere, esse eaque rerum velit labore
          reprehenderit quam, est veniam minus debitis quas quia in expedita
          ullam laborum!"
          level="h1"
        />
      )}

      <div className="grid-area">
        <span style={{ gridColumn: "2/4" }}>
          {" "}
          {endsWithDouleurs ? (
            <h2>Peux-tu orienter ta douleur ?</h2>
          ) : (
            <h3>Peux-tu orienter ta douleur ?</h3>
          )}
        </span>

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
