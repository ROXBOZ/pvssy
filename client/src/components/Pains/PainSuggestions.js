import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utils/HeadingArea";

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

      <div className="additional-ressources">
        <ul>
          {requestedSources &&
            requestedSources.map((s, index) => {
              if (s.isFootnote === false) {
                return (
                  <li key={s._id} id={index}>
                    <span className="source-list-item">
                      <span className="source-author">{s.author}</span>
                      {s.year && (
                        <span className="source-year"> ({s.year}).</span>
                      )}{" "}
                      {s.url ? (
                        <Link to={s.url}>
                          <span className="source-title">{s.title}</span>
                        </Link>
                      ) : (
                        <span className="source-title">{s.title}</span>
                      )}{" "}
                      <span className="source-category">[{s.category}]</span>{" "}
                      {s.editor && (
                        <span className="source-editor">{s.editor}.</span>
                      )}
                    </span>
                  </li>
                );
              }
            })}
          <p className="msg info">
            <span>
              Retrouve{" "}
              <Link to="/se-soigner/ressources/suggestions">
                toutes les suggestions de pvssy talk
              </Link>{" "}
              dans les ressources générales.
            </span>
          </p>
        </ul>
      </div>
    </div>
  );
};

export default PainSuggestions;
