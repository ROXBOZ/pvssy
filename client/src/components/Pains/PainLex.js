import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const PainLex = () => {
  let location = useLocation();
  const painName =
    location.pathname
      .split(/\/|#/)
      .filter((item) => item !== "")
      .slice(-2, -1)[0]
      .slice(0, 1)
      .toUpperCase() +
    location.pathname
      .split(/\/|#/)
      .filter((item) => item !== "")
      .slice(-2, -1)[0]
      .slice(1);

  const [requestedTerms, setRequestedTerms] = useState(null);

  const fetchRelatedTerms = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `https://pvssy-backend.vercel.app/api/terms/byPain?relatedPain=${painName}`,
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

  const createParagraphs = (arr) => {
    return arr.map((p, index) => {
      if (typeof p === "string") {
        return (
          <p key={index}>
            <span key={index}>{p}</span>
          </p>
        );
      } else {
        return <p key={index}>{p}</p>;
      }
    });
  };

  return (
    //  <div className="article">
    <>
      <div className="heading-area">
        <p className="pretitle">Lexique</p>
        <h1>{painName}</h1>
      </div>

      {requestedTerms &&
        requestedTerms.map((t, index) => {
          const termAnchor = t.term
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase();
          return (
            <ul className=" lexique-list" key={index}>
              <li className="lexique-list-item">
                <h2 className="h3" id={termAnchor}>
                  {t.term}
                </h2>
                {createParagraphs(t.def)}
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default PainLex;
