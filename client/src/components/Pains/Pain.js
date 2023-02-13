import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Pain = () => {
  let location = useLocation();
  const { name, def, diag, sympt, pros, auto } = location.state.content;
  // const tutos = `Tutos ${name}`;
  // const annuaire = `Annuaire ${name}`;
  // const articles = `Articles ${name}`;

  const createParagraphs = (arr) => arr.map((p) => <p>{p}</p>);

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
          <h2>Que puis-je faire seule ?</h2>
          {createParagraphs(auto)}
          <h2>Quelles aides existent ?</h2>
          {pros.intro}
          {pros.gyne && (
            <>
              <h3>Gynécologue</h3>
              {pros.gyne}
            </>
          )}
          {pros.kine && (
            <>
              <h3>Kinésithérapeute</h3>
              {pros.kine}
            </>
          )}
          {pros.psyc && (
            <>
              <h3>Psychologue</h3>
              {pros.psyc}
            </>
          )}
          {pros.sexo && (
            <>
              <h3>Sexologue</h3>
              {pros.sexo}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Pain;
