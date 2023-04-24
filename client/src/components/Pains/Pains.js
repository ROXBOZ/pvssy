import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { useLocation } from "react-router-dom";
import { HeadingArea } from "../../utils/HeadingArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Pains = () => {
  const { data, Error } = useContext(PainsContext);
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithDouleurs = /douleurs$/.test(currentUrl);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleFilter = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  const handleReset = () => {
    setSelectedTag(null);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const CreateTags = () => {
    let painTags = ["vagin", "utérus", "règles", "pénétration"];

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
        <span className="reset" onClick={() => handleReset()}>
          <FontAwesomeIcon icon={faXmark} />
           réinitialiser
        </span>
      </div>
    );
  };

  const filteredData = selectedTag
    ? data.filter((p) => p.tags.includes(selectedTag))
    : data;

  return (
    <div>
      {endsWithDouleurs && <HeadingArea title="Douleurs" level="h1" />}
      <div className="grid-area">
        <CreateTags />
      </div>
      <div className="card-grid">
        {filteredData.map((p) => {
          return (
            <Link
              className="link-card"
              onClick={scrollToTop}
              to={{
                pathname: `/s-informer/douleurs/${p.name.toLowerCase()}/medical`,
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
