import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pains = () => {
  const { data, Error } = useContext(PainsContext);

  const createTag = (appelation, index) => {
    return <tag key={index}>{appelation}</tag>;
  };

  return (
    <div>
      <div className="heading-area">
        <p className="pretitle">Comprendre</p>
        <h2>Douleurs</h2>
        <p className="subtitle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          sequi reiciendis, vel facere, esse eaque rerum velit labore
          reprehenderit quam, est veniam minus debitis quas quia in expedita
          ullam laborum!
        </p>
        <div className="tag-container">
          {createTag("mensturations douloureuses")}
          {createTag("pénétration impossible")}
          {createTag("pénétration douloureuse")}
          {createTag("entrée du vagin douloureuse")}
          {createTag("clitoris douloureux")}
          {createTag("vulve douloureuse")}
          {createTag("anus douloureux")}
        </div>
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
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
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
