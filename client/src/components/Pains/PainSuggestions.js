import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const PainSuggestions = () => {
  const { requestedSources } = useContext(PainsContext);
  return (
    <div>
      <div className="heading-area">
        <p className="pretitle">Suggestions</p>
        <h1>Vaginisme</h1>
        <p className="subtitle">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id ab unde
          nisi, amet veritatis eum nulla voluptatum quidem quod placeat iusto
          suscipit voluptas possimus obcaecati blanditiis, neque totam. Soluta,
          beatae.
        </p>
      </div>
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
        </ul>
      </div>
    </div>
  );
};

export default PainSuggestions;
