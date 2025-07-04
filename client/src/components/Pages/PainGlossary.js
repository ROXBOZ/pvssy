import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { serverURL } from "../../utilities/serverURL";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utilities/HeadingArea";
import { createParagraph } from "../../utilities/createParagraphs";
import { Helmet } from "react-helmet";

const PainGlossary = () => {
  const { painName } = useContext(PainsContext);
  const [requestedTerms, setRequestedTerms] = useState(null);

  const fetchRelatedTerms = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${serverURL}/api/terms/byPain?relatedPain=${painName}`,
        requestOptions
      );
      const result = await response.json();
      const sortedTerms = result.requestedTerms.sort((a, b) =>
        a.term.localeCompare(b.term)
      );
      setRequestedTerms(sortedTerms);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchRelatedTerms();
  }, []);

  useEffect(() => {
    const anchor = window.location.hash;
    if (anchor) {
      const element = document.querySelector(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  return (
    <div>
      <Helmet>
        <title>Glossaire {painName} – Pvssy Talk</title>
        <meta
          name="description"
          content={`${painName}: termes et définitions liés à la douleur `}
        />
      </Helmet>
      <div className="title-aside-container">
        <h1>
          Glossaire <span className="colored">{painName.toLowerCase()}</span>
        </h1>
        <div>
          <Link style={{ borderBottom: "none" }} to="/ressources/glossaire">
            <button>Glossaire principal</button>
          </Link>
        </div>
      </div>

      <div className="grid-area">
        {requestedTerms ? (
          <div className="lexique-list">
            {requestedTerms &&
              requestedTerms
                .filter((t) => t.imgUrl)
                .map((t, index) => {
                  const termAnchor = t.term
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-")
                    .replace("œ", "oe")
                    .toLowerCase();
                  return (
                    <ul className=" lexique-list" key={index}>
                      <li className="lexique-list-item">
                        <img
                          src={t.imgUrl}
                          alt={`shéma descriptif, ${t.term}`}
                        />
                        <div>
                          <h2 className="h3" id={termAnchor}>
                            {t.term}
                          </h2>
                          <div className="relatedPains">
                            {t.relatedPain
                              .filter((p) => p !== painName)
                              .map((p, index) => (
                                <span key={index}>
                                  <span> ↗ </span>
                                  <Link key={index} to={`/douleurs/${p}`}>
                                    {p}
                                  </Link>
                                </span>
                              ))}
                          </div>
                          {createParagraph(t.def)}
                        </div>
                      </li>
                    </ul>
                  );
                })}
            {requestedTerms &&
              requestedTerms
                .filter((t) => !t.imgUrl)
                .map((t, index) => {
                  const termAnchor = t.term
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-")
                    .replace("œ", "oe")
                    .toLowerCase();
                  return (
                    <ul className=" lexique-list" key={index}>
                      <li className="lexique-list-item">
                        <div>
                          <h2 className="h3" id={termAnchor}>
                            {t.term}
                          </h2>
                          {createParagraph(t.def)}
                        </div>
                      </li>
                    </ul>
                  );
                })}
          </div>
        ) : (
          <div className="centered">
            <p className="msg warning">
              Il n’y a pas de glossaire relatif à cette douleur pour l’instant.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PainGlossary;
