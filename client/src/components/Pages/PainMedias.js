import React, { useContext } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utilities/HeadingArea";
import { SourceList } from "../../utilities/SourceList";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const PainMedias = () => {
  const { painName, requestedSources } = useContext(PainsContext);
  console.log("requestedSources :", requestedSources);
  return (
    <div>
      <Helmet>
        <title>Littérature et médias {painName} – Pvssy Talk</title>
        <meta
          name="description"
          content={`${painName}: Livres, articles, podcasts, vidéos et bandes dessinées liés à la douleur `}
        />
      </Helmet>

      {requestedSources ? (
        <>
          <div className="title-aside-container">
            <h1>
              Littérature et médias{" "}
              <span className="colored">{painName.toLowerCase()}</span>
            </h1>
            <div>
              <Link
                style={{ borderBottom: "none" }}
                to="/ressources/litterature-et-medias"
              >
                <button>Inventaire complet</button>
              </Link>
            </div>
          </div>
          <SourceList sources={requestedSources} />
        </>
      ) : (
        <div className="grid-area">
          <div className="centered">
            <p className="msg warning">
              Il n’y a pas de médias relatifs à cette douleur pour l’instant.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainMedias;
