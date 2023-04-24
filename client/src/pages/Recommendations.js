import React, { useContext, useEffect } from "react";
import { PainsContext } from "../contexts/PainsContext";
import { HeadingArea } from "../utils/HeadingArea";
import { SourceList } from "../utils/SourceList";
import { Link } from "react-router-dom";

const Recommendations = () => {
  const { fetchAllSources, allSources } = useContext(PainsContext);

  useEffect(() => {
    fetchAllSources();
  }, []);

  return (
    <div>
      <HeadingArea pretitle="Ressources" title="Recommendations" level="h1" />
      <div className="grid-area">
        <p className="msg info centered">
          <span>
            Tu peux également consulter les recommendations spécifiques à{" "}
            <Link to="../s-informer/douleurs">chaque douleur</Link>.
          </span>
        </p>
      </div>
      <SourceList sources={allSources} />
    </div>
  );
};

export default Recommendations;
