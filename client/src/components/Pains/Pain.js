import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { TermsContext } from "../../contexts/termsContext";

const Pain = () => {
  let location = useLocation();
  const { name, def, diag, sympt, pro, auto, why, terms } =
    location.state.content;
  const createParagraphs = (arr) => arr.map((p) => <p>{p}</p>);
  const [termTerm, setTermTerm] = useState("contraction musculaire");
  const [painTerms, setPainTerms] = useState("");
  const { data, fetchData } = useContext(TermsContext);

  //FIXME this logic can not work because I am can only get one result with a fetch using name or id.

  useEffect(() => {
    fetchData(`http://localhost:5000/api/terms/relatedTerms?term=${termTerm}`);
  }, []);

  //TODO getTermsByPain > in terms collection, add a field "relatedPains" to terms

  // FIXME these two maps only works if I first display the page, then uncomment them, I need to receive them earlier

  // data.requestedTerm.map((r) => {
  //   console.log("term being fetched from lexico", r._id); // contraction musculaire _id
  // });

  // terms.map((t) => {
  //   console.log("term from the pain", t);
  //   setPainTerms(t);
  // }); // pain fetch

  // console.log("painTerm", painTerms);

  return (
    <>
      <div className="heading-area">
        {/* <p>LEXIQUE</p> */}
        {/* {t.includes(termTerm) && <p className="term-label">{termTerm}</p>} */}
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
