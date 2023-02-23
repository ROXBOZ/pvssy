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
        `http://localhost:5000/api/terms/byPain?relatedPain=${painName}`,
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

  // When clicking on a term on Pain page, we first wait for the anchors to be fetched and then we scroll down.
  useEffect(() => {
    const anchor = window.location.hash;
    if (anchor) {
      const element = document.querySelector(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // TODO this is also used on Pain.js, avoid duplicate
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
    <div>
      <h1>Lexique {painName}</h1>
      {requestedTerms &&
        requestedTerms.map((t) => {
          const termAnchor = t.term
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase();
          return (
            <div>
              <h2 id={termAnchor}>{t.term}</h2>
              <p>{createParagraphs(t.def)}</p>
            </div>
          );
        })}
    </div>
  );
};

export default PainLex;
