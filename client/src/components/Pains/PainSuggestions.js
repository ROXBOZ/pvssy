import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utils/HeadingArea";
import { SourceList } from "../../utils/SourceList";

const PainSuggestions = () => {
  const { painName, requestedSources } = useContext(PainsContext);
  console.log("requestedSources :", requestedSources);
  return (
    <div>
      <HeadingArea pretitle={painName} title="Recommendations" level="h1" />
      <SourceList sources={requestedSources} />
    </div>
  );
};

export default PainSuggestions;
