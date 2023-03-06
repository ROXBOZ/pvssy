import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Pain = () => {
  let location = useLocation();
  const [requestedTerms, setRequestedTerms] = useState(null);
  const [requestedSources, setRequestedSources] = useState(null);

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
  const fetchRelatedSources = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/sources/byPain?relatedPain=${painName}`,
        requestOptions
      );
      const result = await response.json();
      setRequestedSources(result.requestedSources);
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    fetchSinglePain();
    fetchRelatedTerms();
    fetchRelatedSources();
  }, []);

  if (!painData) {
    return <div>Loading...</div>;
  }

  //this has to be defined  after the fetch
  const { name, def, diag, sympt, pro, auto, why } = painData;

  let sourceCounter = 0;

  const scrollToAnchor = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const createParagraphs = (arr) => {
    const highlightedTerms = requestedTerms
      ? requestedTerms.map((term) => term.term)
      : [];

    const highlightedSources = requestedSources
      ? requestedSources.map((source) => source.title)
      : [];

    const regex = new RegExp(
      `\\b(${highlightedTerms.join("|")}|${highlightedSources.join("|")})\\b`,
      "ig"
    );

    const currentURL = window.location.pathname;

    return arr.map((p, index) => {
      if (typeof p === "string") {
        const matches = p.match(regex);
        if (matches) {
          const parts = p.split(regex);
          return (
            <p key={index}>
              {parts.map((part, index) => {
                if (matches.includes(part)) {
                  const isTerm = highlightedTerms.includes(part);
                  const linkTo = isTerm
                    ? `lexique/#${part
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`
                    : `${currentURL}/#references`;

                  if (isTerm) {
                    return (
                      <Link
                        className="term"
                        key={`${part}${index}`}
                        to={linkTo}
                      >
                        {part}
                      </Link>
                    );
                  } else {
                    sourceCounter++;
                    return (
                      <Link
                        className="source"
                        key={`${part}${index}`}
                        to={linkTo}
                        onClick={(event) => {
                          event.preventDefault();
                          scrollToAnchor("references");
                        }}
                      >
                        {part}
                        <sup>{sourceCounter}</sup>
                      </Link>
                    );
                  }
                } else {
                  return <span key={`${part}${index}`}>{part}</span>;
                }
              })}
            </p>
          );
        } else {
          return (
            <p key={index}>
              <span>{p}</span>
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
      {/* <div className="grid-area"> */}
      <div>
        {/* <div className="col-left"> */}
        <div className="img-holder"></div>
        <div className="tabbed-navigation">
          <NavLink className="active" to="/">
            Médecine
          </NavLink>
          <NavLink to="/">Sexologie</NavLink>
        </div>
        {/* </div> */}

        {/* <div className="col-right"> */}
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

        <div id="references" className="source-ref">
          <h4>Références</h4>
          <ol>
            {requestedSources &&
              requestedSources.map((s) => (
                <li key={s._id} id={s.title}>
                  <span className="source-author">{s.author}</span>
                  <span className="source-year"> ({s.year}). </span>
                  <span className="source-title">{s.title}</span>
                  <span className="source-edition">
                    &nbsp;({s.edition}
                    {s.edition === "1" ? "ère" : "ème"} éd.) 
                  </span>
                  <span className="editor">{s.editor}</span>.
                </li>
              ))}
          </ol>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Pain;
