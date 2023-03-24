import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utils/HeadingArea";
import { SourceList } from "../../utils/SourceList";

const PainSuggestions = () => {
  const { painName, requestedSources } = useContext(PainsContext);

  return (
    <div>
      <HeadingArea
        pretitle={painName}
        title="Suggestions"
        subtitle=" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id ab unde
          nisi, amet veritatis eum nulla voluptatum quidem quod placeat iusto
          suscipit voluptas possimus obcaecati blanditiis, neque totam. Soluta,
          beatae."
        level="h1"
      />

      <SourceList sources={requestedSources} />

      <div className="grid-area">
        <p className="msg info centered">
          <span>
            Retrouve{" "}
            <Link to="/se-soigner/ressources/suggestions">
              toutes les suggestions de pvssy talk
            </Link>{" "}
            dans les ressources générales.
          </span>
        </p>
      </div>
    </div>
  );
};

export default PainSuggestions;
