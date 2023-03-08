import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const PainMed = () => {
  const { painData, requestedTerms, requestedSources } =
    useContext(PainsContext);

  let sourceCounter = 0;

  const scrollToAnchor = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const highlightParagraphs = (arr) => {
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

    let currentURL = window.location.pathname;

    return arr.map((p, index) => {
      if (typeof p === "string") {
        const parts = p.split(regex);

        return (
          <p key={index}>
            {parts.map((part, index) => {
              if (regex.test(part)) {
                const isTerm = highlightedTerms.includes(part);
                const linkTo = isTerm
                  ? `../lexique/#${part
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`
                  : `${currentURL}/#references`;
                if (isTerm) {
                  return (
                    <Link className="term" key={`${part}-${index}`} to={linkTo}>
                      {part}
                    </Link>
                  );
                } else {
                  sourceCounter++;
                  return (
                    <Link
                      className="source"
                      key={`${part}-${index}`}
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
                return <span key={`${part}-${index}`}>{part}</span>;
              }
            })}
          </p>
        );
      } else {
        return <p key={`${index}`}>{p}</p>;
      }
    });
  };

  //FIXME MERGE WITH SEXO IN ONE ARTICLE COMPONENT USING CONDITIONALS

  return (
    <div className="article" id="medical">
      <div className="auteurice">
        <div className="img-holder" />
        <em>
          par <Link to="https://aemg-ge.com/">Medsexplain</Link>
        </em>
      </div>

      <ul className="category-submenu">
        <p className="h4">Ressources</p>{" "}
        <li>
          <Link to="*">Tutos</Link>
        </li>
        <li>
          <Link to="*">Shémas</Link>
        </li>
        <li>
          <Link to="../lexique">Lexique</Link>
        </li>
      </ul>

      <h2>Définition</h2>
      {highlightParagraphs(painData.def)}
      <h2>Diagnostic</h2>
      {highlightParagraphs(painData.diag)}
      <h2>Symptômes</h2>
      {highlightParagraphs(painData.sympt)}
      <h2>Pourquoi ça m’arrive ?</h2>
      {highlightParagraphs(painData.why)}
      <h2>Que puis-je faire seule ?</h2>
      {highlightParagraphs(painData.auto)}
      <h2>Quelles aides existent ?</h2>
      <p>{painData.pro.intro}</p>
      {painData.pro.gyne && (
        <>
          <h3>Gynécologue</h3>
          <p>{painData.pro.gyne}</p>
        </>
      )}
      {painData.pro.kine && (
        <>
          <h3>Kinésithérapeute</h3>
          <p>{painData.pro.kine}</p>
        </>
      )}
      {painData.pro.psyc && (
        <>
          <h3>Psychologue</h3>
          <p>{painData.pro.psyc}</p>
        </>
      )}
      {painData.pro.sexo && (
        <>
          <h3>Sexologue</h3>
          <p>{painData.pro.sexo}</p>
        </>
      )}
      <div id="references" className="source-ref">
        <h4>Bibliographie</h4>
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
  );
};

export default PainMed;
