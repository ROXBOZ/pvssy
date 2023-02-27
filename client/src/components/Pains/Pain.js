import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
            <p key={index}>
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
            </p>
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
          <strong>Ressources {name} :</strong>{" "}
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
          <div className="tabbed-navigation">
            <NavLink className="active" to="/">
              Approche X
            </NavLink>
            <NavLink to="/">Approche Y</NavLink>
          </div>
        </div>

        <div className="col-right">
          <h2>Définition</h2>
          <p>
            Lors de la nouvelle édition du{" "}
            <span className="source">
              Manuel Diagnostique et Statistique des troubles mentaux
              <sup>1</sup>
            </span>
            , ce terme a été abandonné et regroupé avec toutes les dyspareunies
            sous “trouble lié à des douleurs génito-pelviennes ou à la
            pénétration”. Il s’agit en vérité de troubles différents. Tu peux
            découvrir les autres formes sur le reste de l’application.
          </p>
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
          <p>{pro.intro}</p>
          {pro.gyne && (
            <>
              <h3>Gynécologue</h3>
              <p>{pro.gyne}</p>
            </>
          )}
          {pro.kine && (
            <>
              <h3>Kinésithérapeute</h3>
              <p>{pro.kine}</p>
            </>
          )}
          {pro.psyc && (
            <>
              <h3>Psychologue</h3>
              <p>{pro.psyc}</p>
            </>
          )}
          {pro.sexo && (
            <>
              <h3>Sexologue</h3>
              <p>{pro.sexo}</p>
            </>
          )}
          <hr />
          <h4>Références</h4>
          <div className="source-ref">
            <ol>
              <li>
                American Psychiatric Association, Marc-Antoine Crocq,
                Julien-Daniel Guelfi, Patrice Boyer, Charles-Bernard Pull,
                Marie-Claire Pull (2015).{" "}
                <em>Manuel Diagnostique et Statistique des troubles mentaux</em>{" "}
                (5e éd.). Elsevier Masson.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pain;
