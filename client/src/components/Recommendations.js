import React, { useContext, useEffect } from "react";
import { PainsContext } from "../contexts/PainsContext";
import { HeadingArea } from "../utils/HeadingArea";
import { SourceList } from "../utils/SourceList";

const Recommendations = () => {
  const { fetchAllSources, allSources } = useContext(PainsContext);

  useEffect(() => {
    fetchAllSources();
  }, []);

  return (
    <div>
      <HeadingArea title="Littérature et médias" level="h1" />
      <SourceList sources={allSources} />
    </div>
  );
};

export default Recommendations;
