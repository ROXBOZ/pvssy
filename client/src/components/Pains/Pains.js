import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { useLocation } from "react-router-dom";
import { HeadingArea } from "../../utils/HeadingArea";

const Pains = () => {
  const { data, Error } = useContext(PainsContext);
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithDouleurs = /douleurs$/.test(currentUrl);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleFilter = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  const CreateTags = () => {
    let painTags = [
      "vagin",
      // "clitoris",
      // "vulve",
      "utérus",
      // "ovaires",
      // "anus",
      "règles",
      "pénétration",
    ];

    return (
      <div className="tag-container">
        {painTags.map((tag, index) => {
          return (
            <span
              key={index}
              className={`tag ${selectedTag === tag ? "active" : ""}`}
              onClick={() => handleFilter(tag)}
            >
              {tag}
            </span>
          );
        })}
      </div>
    );
  };

  const filteredData = selectedTag
    ? data.filter((p) => p.tags.includes(selectedTag))
    : data;

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
        <span className="centered">
          {endsWithDouleurs ? (
            <h2 style={{ marginBottom: "0" }}>Peux-tu orienter ta douleur ?</h2>
          ) : (
            <h3 style={{ marginBottom: "0" }}>Peux-tu orienter ta douleur ?</h3>
          )}
        </span>
        <CreateTags />
      </div>

      <div className="card-grid">
        {filteredData.map((p) => {
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
                <h3>
                  {p.name === "Sopk" ? (
                    <span className="acronym">{p.name}</span>
                  ) : (
                    <>{p.name}</>
                  )}
                </h3>
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
