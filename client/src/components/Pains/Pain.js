import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { TermsContext } from "../../contexts/termsContext";

const Pain = () => {
  let location = useLocation();
  const { name, def, diag, sympt, pro, auto, why } = location.state.content;
  const createParagraphs = (arr) => arr.map((p) => <p>{p}</p>);

  // All terms are fetched here... >>> only the terms that are connected to the pain!!!!
  // Query parameters ?????
  const { data, url, fetchData } = useContext(TermsContext);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  console.log("terms", data);

  return (
    <>
      <div className="heading-area">
        <h1>{name}</h1>
        <ul className="category-submenu">
          Ressources {name} :{" "}
          <li>
            <Link
              to={{
                pathname: `/gerer-soi-meme/ressources/tutos/${name.toLowerCase()}`,
              }}
            >
              Tutos
            </Link>
          </li>
          {/* <li>
            <Link to="/trouver-de-l-aide/annuaire">Annuaire</Link>
          </li> */}
          <li>
            <Link
              to={{
                pathname: `/gerer-soi-meme/ressources/articles/${name.toLowerCase()}`,
              }}
            >
              Articles
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: `/gerer-soi-meme/ressources/lexique/${name.toLowerCase()}`,
              }}
            >
              Lexique
            </Link>
          </li>
        </ul>
      </div>
      <div className="grid-area">
        <div className="col-left">
          <div className="img-holder"></div>
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
        </div>
      </div>
    </>
  );
};

export default Pain;
