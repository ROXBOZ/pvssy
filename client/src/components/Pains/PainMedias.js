import React, { useContext } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utils/HeadingArea";
import { SourceList } from "../../utils/SourceList";

const PainMedias = () => {
  const { painName, requestedSources } = useContext(PainsContext);
  console.log("requestedSources :", requestedSources);
  return (
    <div>
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
