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
        pretitle={painName}
        title="Littérature et médias"
        level="h1"
      />
      <SourceList sources={requestedSources} />
    </div>
  );
};

export default PainMedias;
