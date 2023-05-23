import { Link, useLocation } from "react-router-dom";
import { serverURL } from "../../utilities/serverURL";
import { PainsContext } from "../../contexts/PainsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { createParagraph } from "../../utilities/createParagraphs";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { HeadingArea } from "../../utilities/HeadingArea";
import { AuthContext } from "../../contexts/authContext";
import { Helmet } from "react-helmet";

const Glossary = () => {
  const [allTerms, setAllTerms] = useState(null);
  const location = useLocation();
  const [, setAnchorPosition] = useState(0);
  const [topList, setTopList] = useState(0);
  const [entries, setEntries] = useState([]);
  const { isSticky, setIsSticky } = useContext(PainsContext);
  const { isMobile } = useContext(AuthContext);
  const letterContainerRef = useRef(null);

  // 1. fetch all terms
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

  // 2. separate entries with Letter titles
  const termGroups = allTerms?.reduce((groups, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(term);
    return groups;
  }, {});

  // 3. each term as itself as an id
  const termId = (term) => {
    return term
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  // 4. create a grid of letter links "" or disabled
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

  // 5. detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrolledPast = scrollY > topList;
      setIsSticky(isScrolledPast);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topList]);

  // 6. Letter link grid scroll
  const scrollToAnchor = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });
      setAnchorPosition(top);
      setTopList(letterContainerRef.current.offsetTop);
    }
  };

  // 7. decide where it sticks
  useLayoutEffect(() => {
    if (letterContainerRef.current) {
      setTopList(letterContainerRef.current.offsetTop);
    }
  }, [letterContainerRef.current]);

  //8. handle input

  const handleInput = (event) => {
    event.preventDefault();
    const searchTerm = event.target.value.toLowerCase();
    const termElements = document.querySelectorAll(".allLexique-term");

    let matchedTermElement = null;
    for (let i = 0; i < termElements.length; i++) {
      const termText = termElements[i]
        .querySelector("h3")
        .textContent.toLowerCase();
      if (termText.startsWith(searchTerm)) {
        matchedTermElement = termElements[i];
        break;
      }
    }

    if (matchedTermElement) {
      const id = matchedTermElement.querySelector("h3").id;
      if (id) {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          const top = targetElement.offsetTop;
          setTimeout(() => {
            window.scrollTo({ top, behavior: "smooth" });
          }, 1000);
        }
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Glossaire Pvssy Talk</title>
        <meta
          name="description"
          content="Glossaire de termes en lien avec les douleurs sexuelles et la sexualité"
        />
        <meta name="keywords" content="glossaire, douleurs sexuelles" />
      </Helmet>
      <HeadingArea title="Glossaire" level="h1" />

      <div className="allLexique-term-container">
        <div className="glossary-dashboard-column">
          <div
            className={`${!isMobile && isSticky ? "fixed" : "float"}`}
            ref={letterContainerRef}
          >
            <form>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                className="search-bar"
                onChange={handleInput}
                type="text"
                placeholder="recherche"
              />
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
          </div>
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
                    <h3 className="term-entry" id={termId(term.term)}>
                      {term.term}
                    </h3>
                    <div className="related-pain-container">
                      {term.relatedPain.map((pain, index) => (
                        <span className="related-pain">
                          <span> ↗ </span>
                          <Link key={index} to={`/douleurs/${pain}`}>
                            {pain === "Sopk" ? (
                              <span className="acronym">{pain}</span>
                            ) : (
                              <span>{pain}</span>
                            )}
                          </Link>
                        </span>
                      ))}
                    </div>
                    {term.imgUrl && (
                      <>
                        <img
                          src={term.imgUrl}
                          alt={`shéma pour ${term.term}`}
                        />
                      </>
                    )}

                    {createParagraph(term.def)}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Glossary;
