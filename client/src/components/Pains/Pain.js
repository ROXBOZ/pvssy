import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Pain = () => {
  let location = useLocation();
  const { name, def, diag, sympt, aides, auto } = location.state.content;
  const ressourcesLink = `Ressources ${name}`;
  const agendaLink = `Évènements ${name}`;
  const createParagraphs = (arr) => arr.map((p) => <p>{p}</p>);

  return (
    <>
      <div className="heading-area">
        <h1>{name}</h1>
        <ul className="category-submenu">
          <li>
            <Link to="/">{ressourcesLink}</Link>
          </li>

          <li>
            <Link to="/connect">{agendaLink}</Link>
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
          {aides.intro}
          {aides.gyné && (
            <>
              <h3>Gynécologue</h3>
              {aides.gyné}
            </>
          )}
          {aides.kiné && (
            <>
              <h3>Kinésithérapeute</h3>
              {aides.kiné}
            </>
          )}
          {aides.psyc && (
            <>
              <h3>Psychologue</h3>
              {aides.psyc}
            </>
          )}
          {aides.sexo && (
            <>
              <h3>Sexologue</h3>
              {aides.sexo}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Pain;
