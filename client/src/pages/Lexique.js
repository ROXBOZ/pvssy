import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { serverURL } from "../utils/serverURL";

const Lexique = () => {
  const [allTerms, setAllTerms] = useState(null);
  const location = useLocation();
  const [anchorPosition, setAnchorPosition] = useState(0);
  const [menuTop, setMenuTop] = useState(0);
  const [entries, setEntries] = useState([]);

  const fetchAllTerms = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${serverURL}/api/terms/all`,
        requestOptions
      );
      const result = await response.json();
      const sortedTerms = result.allTerms.sort((a, b) =>
        a.term.localeCompare(b.term)
      );
      const firstLetters = sortedTerms.map((term) =>
        term.term[0].toLowerCase()
      );
      const uniqueLetters = [...new Set(firstLetters)];

      setEntries(uniqueLetters);
      setAllTerms(sortedTerms);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAllTerms();
  }, []);

  const termGroups = allTerms?.reduce((groups, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(term);
    return groups;
  }, {});

  useEffect(() => {
    const letterLinks = document.querySelectorAll(".letter-link");

    letterLinks.forEach((link) => {
      const letter = link.innerText.toLowerCase();

      if (!entries.includes(letter)) {
        link.classList.add("disabled");
      } else {
        link.classList.remove("disabled");
      }
    });
  }, [entries]);

  const termId = (term) => {
    return term
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const scrollToAnchor = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });
      setAnchorPosition(top);
      setMenuTop(top);
    }
  };

  return (
    <div>
      <div className="heading-area">
        <p className="pretitle">Ressources</p>
        <h2>Glossaire</h2>
        <p className="subtitle">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam cum
          iste quas vitae sequi, consequuntur inventore officiis, expedita
          quaerat accusamus praesentium optio impedit delectus eligendi. Nisi
          distinctio aspernatur adipisci atque.
        </p>
      </div>

      <div className="allLexique-term-container">
        <div className="glossary-dashboard-column">
          <form>
            <input type="text" placeholder="pubarche, plancher pelvien" />
            <button>chercher</button>
          </form>
          <div className="letter-link-container">
            {Array.from({ length: 26 }, (_, i) =>
              String.fromCharCode("A".charCodeAt(0) + i)
            ).map((letter, index) => (
              <Link
                className="letter-link"
                key={index}
                to={`${location.pathname}/#${letter}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToAnchor(letter);
                }}
              >
                {letter}
              </Link>
            ))}
          </div>
          <p className="msg info">
            Tu peux également consulter le glossaire relatif à 
            <Link to="../se-soigner/douleurs">chaque douleur</Link>.
          </p>
        </div>

        <div className="glossary-column">
          {termGroups &&
            Object.entries(termGroups).map(([letter, terms]) => (
              <div className="letter-title" key={letter}>
                <p id={letter} className="h1">
                  {letter}
                </p>
                {terms.map((term, index) => (
                  <div className="entry allLexique-term" key={index}>
                    <h3 id={termId(term.term)}>
                      {term.term.charAt(0).toUpperCase() + term.term.slice(1)}
                    </h3>

                    {term.relatedPain.length > 0 && <span>↗ </span>}
                    {term.relatedPain.map((pain, index) => (
                      <span key={index}>
                        <Link key={index} to={`/se-soigner/douleurs/${pain}`}>
                          {pain}
                        </Link>
                        {index < term.relatedPain.length - 1 ? (
                          <span>  ↗ </span>
                        ) : (
                          ""
                        )}
                      </span>
                    ))}
                    {term.imgUrl && (
                      <div>
                        <img
                          src={term.imgUrl}
                          alt={`shéma pour ${term.term}`}
                        />
                      </div>
                    )}
                    <p>{term.def}</p>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Lexique;
