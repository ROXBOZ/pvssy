import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const PainMed = () => {
  // let location = useLocation();
  // const {
  //   painData,
  //   setPainData,
  //   requestedTerms,
  //   requestedSources,
  //   def,
  //   diag,
  //   sympt,
  //   pro,
  //   auto,
  //   why,
  // } = useContext(PainsContext);

  // const painName =
  //   location.pathname.split("/").pop().slice(0, 1).toUpperCase() +
  //   location.pathname.split("/").pop().slice(1);

  // const fetchSinglePain = async () => {
  //   const requestOptions = {
  //     method: "GET",
  //   };

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/pains/spec/${painName}`,
  //       requestOptions
  //     );
  //     const result = await response.json();
  //     setPainData(result);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // let sourceCounter = 0;

  // const scrollToAnchor = (id) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  // const highlightParagraphs = (arr) => {
  //   const highlightedTerms = requestedTerms
  //     ? requestedTerms.map((term) => term.term)
  //     : [];
  //   const highlightedSources = requestedSources
  //     ? requestedSources.map((source) => source.title)
  //     : [];
  //   const regex = new RegExp(
  //     `\\b(${highlightedTerms.join("|")}|${highlightedSources.join("|")})\\b`,
  //     "ig"
  //   );

  //   let currentURL = window.location.pathname;

  //   return arr.map((p, index) => {
  //     if (typeof p === "string") {
  //       const parts = p.split(regex);

  //       return (
  //         <p key={index}>
  //           {parts.map((part, index) => {
  //             if (regex.test(part)) {
  //               const isTerm = highlightedTerms.includes(part);
  //               const linkTo = isTerm
  //                 ? `lexique/#${part
  //                     .normalize("NFD")
  //                     .replace(/[\u0300-\u036f]/g, "")
  //                     .replace(/\s+/g, "-")
  //                     .toLowerCase()}`
  //                 : `${currentURL}/#references`;
  //               if (isTerm) {
  //                 return (
  //                   <Link className="term" key={`${part}-${index}`} to={linkTo}>
  //                     {part}
  //                   </Link>
  //                 );
  //               } else {
  //                 sourceCounter++;
  //                 return (
  //                   <Link
  //                     className="source"
  //                     key={`${part}-${index}`}
  //                     to={linkTo}
  //                     onClick={(event) => {
  //                       event.preventDefault();
  //                       scrollToAnchor("references");
  //                     }}
  //                   >
  //                     {part}
  //                     <sup>{sourceCounter}</sup>
  //                   </Link>
  //                 );
  //               }
  //             } else {
  //               return <span key={`${part}-${index}`}>{part}</span>;
  //             }
  //           })}
  //         </p>
  //       );
  //     } else {
  //       return <p key={`${index}`}>{p}</p>;
  //     }
  //   });
  // };

  return (
    <>
      <h2>Définition</h2>
      {/* {highlightParagraphs(def)} */}

      {/* <h2>Diagnostic</h2>
        {highlightParagraphs(diag)}
      <h2>Symptômes</h2>
      {highlightParagraphs(sympt)}
      <h2>Pourquoi ça m’arrive ?</h2>
      {highlightParagraphs(why)}
      <h2>Que puis-je faire seule ?</h2>
      {highlightParagraphs(auto)}
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
      )} */}
    </>
  );
};

export default PainMed;
