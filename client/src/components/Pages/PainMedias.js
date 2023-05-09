import React, { useContext } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utilities/HeadingArea";
import { SourceList } from "../../utilities/SourceList";
import { Helmet } from "react-helmet";

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
      <HeadingArea
        color={
          painName === "Sopk" ? painName.toUpperCase() : painName.toLowerCase()
        }
        title="Littérature et médias"
        level="h1"
      />
      {requestedSources ? (
        <SourceList sources={requestedSources} />
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
