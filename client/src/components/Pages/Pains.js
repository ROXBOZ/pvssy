import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { useLocation } from "react-router-dom";
import { HeadingArea } from "../../utilities/HeadingArea";
import CreateTags from "../../utilities/CreateTags";
import { Helmet } from "react-helmet";

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

  // useEffect(() => {
  //   CreateTags(painTags);
  // }, []);

  return (
    <div>
      {endsWithDouleurs && (
        <>
          <Helmet>
            {selectedTag ? (
              <title>Douleurs sexuelles ({selectedTag}) – Pvssy Talk</title>
            ) : (
              <title>Douleurs sexuelles – Pvssy Talk</title>
            )}

            <meta
              name="description"
              content="Pvssy Talk t'aide à identifier les douleurs sexuelles que tu peux ressentir et à trouver des solutions."
            />
          </Helmet>
          <div className="title-aside-container">
            <h1>Douleurs</h1>
            <div>
              <p className="subtitle">
                Chaque douleur est traitée avec une approche à la fois médicale
                et sexologique pour te donner une vision complète.
              </p>
            </div>
          </div>
        </>
      )}

      <div>
        <p
          className="subtitle"
          style={{ color: "red", gridColumn: "7/13", marginBottom: "0" }}
        >
          Dans quelles régions de ta vulve ou dans quelles circonstances{" "}
          <nobr>as-tu mal ?</nobr>
        </p>
        <CreateTags tags={painTags} />
      </div>

      <div className="card-grid">
        {filteredData.map((p) => {
          return (
            <Link
              key={p._id}
              className="link-card"
              onClick={scrollToTop}
              to={{
                pathname: `/douleurs/${p.name.toLowerCase()}/medical`,
              }}
            >
              <div className="card">
                <img src={p.img} alt={p.name} />
                <h3 className="subtitle">{p.name}</h3>
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
