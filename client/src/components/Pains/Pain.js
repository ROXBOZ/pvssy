import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Pain = () => {
  let location = useLocation();
  const [requestedTerms, setRequestedTerms] = useState(null);
  const [painData, setPainData] = useState(null);

  // since the name of the pain is capitalized in the database, but in lowerCase in the URL.
  const painName =
    location.pathname.split("/").pop().slice(0, 1).toUpperCase() +
    location.pathname.split("/").pop().slice(1);

  const fetchSinglePain = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/pains/spec/${painName}`,
        requestOptions
      );
      const result = await response.json();

      setPainData(result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchRelatedTerms = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/terms/byPain?relatedPain=${painName}`,
        requestOptions
      );
      const result = await response.json();
      setRequestedTerms(result.requestedTerms);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchSinglePain();
    fetchRelatedTerms();
  }, []);

  // this is essential to avoid crash
  if (!painData) {
    return <div>Loading...</div>;
  }

  //this has to be defined  after the fetch
  const { name, def, diag, sympt, pro, auto, why } = painData;

  // TODO this should be moved stored somewhere else, so I can reuse it everywhere

  //Creating paragraphs + highlighting related Terms.
  const createParagraphs = (arr) => {
    const highlightedTerms = requestedTerms
      ? requestedTerms.map((term) => term.term)
      : [];
    const regex = new RegExp(`\\b(${highlightedTerms.join("|")})\\b`, "ig");

    return arr.map((p, index) => {
      if (typeof p === "string") {
        const matches = p.match(regex);
        if (matches) {
          const parts = p.split(regex);
          return (
            <span key={index}>
              {parts.map((part, i) => {
                if (matches.includes(part)) {
                  return (
                    <Link
                      key={i}
                      to={{
                        pathname: `lexique/#${part
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`,
                      }}
                    >
                      {part}
                    </Link>
                  );
                } else {
                  return <span key={i}>{part}</span>;
                }
              })}
            </span>
          );
        } else {
          return (
            <p key={index}>
              <span key={index}>{p}</span>
            </p>
          );
        }
      } else {
        return <p key={index}>{p}</p>;
      }
    });
  };

  return (
    <>
      <div className="heading-area">
        <h1>{name}</h1>
        <ul className="category-submenu">
          Ressources {name} :{" "}
          <li>
            <Link to="*">Tutos</Link>
          </li>
          <li>
            <Link to="*">Articles</Link>
          </li>
          <li>
            <Link to="*">Shémas</Link>
          </li>
          <li>
            <Link to="lexique">Lexique</Link>
          </li>
        </ul>
      </div>
      <div className="grid-area">
        <div className="col-left">
          <div className="img-holder"></div>

          {/* NOTE this should not be deleted, in case we want to display tags somewhere}

          {/* <div className="related-terms-container">
            {requestedTerms &&
              requestedTerms.map((t) => {
                const termAnchor = t.term
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+/g, "-")
                  .toLowerCase();
                return (
                  <Link
                    key={t._id}
                    to={{
                      pathname: `lexique/#${termAnchor}`,
                    }}
                  >
                    <p className="tag">{t.term}</p>
                  </Link>
                );
              })}
          </div> */}
        </div>

        <div className="col-right">
          <h2>Définition</h2>
          {createParagraphs(def)}
          <h2>Diagnostic</h2>
          {createParagraphs(diag)}
          <h2>Symptômes</h2>
          {createParagraphs(sympt)}
          <h2>Pourquoi ça m’arrive ?</h2>
          {createParagraphs(why)}
          <h2>Que puis-je faire seule ?</h2>
          {createParagraphs(auto)}
          <h2>Quelles aides existent ?</h2>
          {pro.intro}
          {pro.gyne && (
            <>
              <h3>Gynécologue</h3>
              {pro.gyne}
            </>
          )}
          {pro.kine && (
            <>
              <h3>Kinésithérapeute</h3>
              {pro.kine}
            </>
          )}
          {pro.psyc && (
            <>
              <h3>Psychologue</h3>
              {pro.psyc}
            </>
          )}
          {pro.sexo && (
            <>
              <h3>Sexologue</h3>
              {pro.sexo}
            </>
          )}
          <hr />
          <h4>Bibliographie</h4>
        </div>
      </div>
    </>
  );
};

export default Pain;
