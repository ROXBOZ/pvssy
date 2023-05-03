import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { useLocation } from "react-router-dom";
import { HeadingArea } from "../../utils/HeadingArea";
import CreateTags from "../../utils/CreateTags";

const Pains = () => {
  const { data, Error } = useContext(PainsContext);
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithDouleurs = /douleurs$/.test(currentUrl);
  const { selectedTag, painTags } = useContext(PainsContext);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const filteredData = selectedTag
    ? data.filter((p) => p.tags.includes(selectedTag))
    : data;

  return (
    <div>
      {endsWithDouleurs && (
        <>
          <HeadingArea
            title="Douleurs"
            level="h1"
            subtitle="Chaque douleur est traitée avec une approche à la fois médicale et sexologique pour te donner une vision complète."
          />
        </>
      )}
      <div className="grid-area">
        <p className="centered">
          Dans quelles régions de ta vulve ou dans quelles circonstances{" "}
          <nobr>as-tu mal ?</nobr>
        </p>
      </div>
      <CreateTags tags={painTags} />

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
