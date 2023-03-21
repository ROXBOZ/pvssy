import { Link, NavLink } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import ShareThis from "../ShareThis";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const PainArticle = () => {
  let currentURL = window.location.pathname;
  const submenuRef = useRef(null);
  const menuRef = useRef();
  const [anchorPosition, setAnchorPosition] = useState(0);
  const [menuTop, setMenuTop] = useState(0);
  const {
    isSticky,
    setIsSticky,
    isMed,
    setIsMed,
    painData,
    requestedTerms,
    requestedSources,
  } = useContext(PainsContext);
  const highlightedTerms = requestedTerms
    ? requestedTerms.map((term) => term.term)
    : [];
  const highlightedSources = requestedSources
    ? requestedSources.map((source) => source.title)
    : [];

  // URL depending on article type
  const articleType = () => {
    if (currentURL.endsWith("/medical")) {
      setIsMed(true);
    } else if (currentURL.endsWith("/sexologie")) {
      setIsMed(false);
    }
  };
  useEffect(() => {
    articleType();
  }, [currentURL]);

  // article switcher
  useLayoutEffect(() => {
    if (menuRef.current) {
      setMenuTop(menuRef.current.offsetTop);
    }
  }, [menuRef.current]);

  // article switcher scroll into view
  let articleRef = document.getElementById("articleRef");
  const scrollToArticle = () => {
    articleRef.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Scroll down to ressources and sources
  //FIXME it repeats also in glossary
  const scrollToAnchor = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });
      setAnchorPosition(top);
      setMenuTop(top);
    }
  };

  // highlight paragraphs with lexico and sources
  const highlightParagraphs = (arr) => {
    console.log("arr::: :", arr);
    const regex = new RegExp(
      `\\b(${highlightedTerms.join("|")}|${highlightedSources.join("|")})\\b`,
      "ig"
    );

    return arr.map((p, index) => {
      console.log("p :", p);
      if (typeof p === "string") {
        const parts = p.split(regex);

        return (
          <p key={index}>
            {parts.map((part, index) => {
              if (regex.test(part)) {
                const isTerm = highlightedTerms.includes(part);
                const linkTo = isTerm
                  ? `../glossaire/#${part
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`
                  : `${currentURL}/#references`;
                if (isTerm) {
                  return (
                    <>
                      <Link
                        className="term"
                        key={`${part}-${index}`}
                        to={linkTo}
                      >
                        {part} <span>↗</span>
                      </Link>
                    </>
                  );
                } else {
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

  // menus stick // repeats on glossaire page
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrolledPast = scrollY > menuTop;
      setIsSticky(isScrolledPast);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuTop]);

  return (
    <>
      <figure>
        <img
          className="pain-illu-cover"
          src={painData.img}
          alt={painData.name}
        />
        <span>
          Illustré par <Link to="https://noemiecreux.com/">Noémie Creux</Link>
        </span>
      </figure>

      <div className="tabbed-navigation-banner">
        <div
          className={`tabbed-navigation-container  ${isSticky ? "sticky" : ""}`}
          ref={menuRef}
        >
          <div className="tabbed-navigation">
            <NavLink to={`../medical`} onClick={scrollToArticle}>
              Médical
            </NavLink>
            <NavLink to={`../sexologie`} onClick={scrollToArticle}>
              Sexologie
            </NavLink>
          </div>
        </div>
      </div>

      <div className="article" id="articleRef">
        <div className="auteurice">
          <div className="img-holder" />
          <em>
            par{" "}
            {isMed ? (
              <Link to="https://aemg-ge.com/">Medsexplain</Link>
            ) : (
              <Link to="https://aemg-ge.com/">Fiona Bourdon + ...</Link>
            )}
          </em>
        </div>

        <ul
          className={`category-submenu ${isSticky ? "fixed" : ""}`}
          ref={submenuRef}
        >
          <ShareThis />
          <p className="h4">
            {/* Ressources */}
            Guide
            <br />
            {painData.name}
            <br />
          </p>

          <li>
            <Link to="../glossaire">Glossaire</Link>
          </li>
          <li>
            <Link to="../exercices">Exercices</Link>
          </li>
          <li>
            <Link
              to={`${currentURL}/#ressources`}
              onClick={(event) => {
                event.preventDefault();
                scrollToAnchor("ressources");
              }}
            >
              Ressources
            </Link>
          </li>
        </ul>

        {isMed ? (
          <>
            <h2>Définition</h2>
            {highlightParagraphs(painData.def)}
            <h2>Diagnostic</h2>
            {highlightParagraphs(painData.diag)}
            <h2>Symptômes</h2>
            {highlightParagraphs(painData.sympt)}
            <div className="article-illustration-container">
              <img
                className="article-illustration"
                src="https://res.cloudinary.com/dkyialww7/image/upload/v1679401608/pain-img/Screenshot_2023-03-21_at_13.21.51_pqlhce.png"
                alt={painData.name}
              />
            </div>
            <h2>Pourquoi ça m’arrive ?</h2>
            {highlightParagraphs(painData.why)}
            <h2>Que puis-je faire seule ?</h2>
            {highlightParagraphs(painData.auto)}
            <h2>Quelles aides existent ?</h2>
            <p>{painData.pro.intro}</p>
            {painData.pro.gyne && (
              <>
                <h3>Gynécologue</h3>
                {highlightParagraphs(painData.pro.gyne)}
              </>
            )}
            {painData.pro.kine && (
              <>
                <h3>Kinésithérapeute</h3>
                {highlightParagraphs(painData.pro.kine)}
              </>
            )}
            {painData.pro.psyc && (
              <>
                <h3>Psychologue</h3>
                {highlightParagraphs(painData.pro.psyc)}
              </>
            )}
            {painData.pro.sexo && (
              <>
                <h3>Sexologue</h3>
                {highlightParagraphs(painData.pro.sexo)}
              </>
            )}
          </>
        ) : (
          <>
            <h2>Lien à soi</h2>
            <h3>Image /schéma corporel</h3>
            <p>{highlightParagraphs(painData.body)}</p>
            <h3>Normes genrées</h3>
            <p>{highlightParagraphs(painData.norms)}</p>
            <h3>Vie quotidienne</h3>
            <p>{highlightParagraphs(painData.routine)}</p>
            <h2>Libido</h2>
            <p>{highlightParagraphs(painData.libido)}</p>
            <h3>
              Charge mentale / communication /
              <br />
              consentement
            </h3>
            <p>{highlightParagraphs(painData.consent)}</p>
            <h2>Santé mentale</h2>
            <p>{highlightParagraphs(painData.mental)}</p>
            <h2>Parentalité</h2>
            <p>{highlightParagraphs(painData.parenthood)}</p>
            <h2>Avec les pros</h2>
            <p>{highlightParagraphs(painData.checkup)}</p>
            <h2>Plaisir / anti-douleur</h2>
            <p>{highlightParagraphs(painData.pleasure)}</p>
          </>
        )}
        <div id="ressources" className="additional-ressources">
          {/* <p className="pretitle">Ressources</p>
          <h2>À découvrir</h2> */}
          <p className="pretitle">À découvrir</p>
          <h2>Ressources</h2>
          <ul>
            {requestedSources &&
              requestedSources.map((s, index) => {
                if (s.isFootnote === false) {
                  return (
                    <li key={s._id} id={index}>
                      <span className="source-list-item">
                        <span className="source-author">{s.author}</span>
                        {s.year && (
                          <span className="source-year"> ({s.year}).</span>
                        )}{" "}
                        {s.url ? (
                          <Link to={s.url}>
                            <span className="source-title">{s.title}</span>
                          </Link>
                        ) : (
                          <span className="source-title">{s.title}</span>
                        )}{" "}
                        <span className="source-category">[{s.category}]</span>{" "}
                        {s.editor && (
                          <span className="source-editor">{s.editor}.</span>
                        )}
                      </span>
                    </li>
                  );
                }
              })}
          </ul>
        </div>

        <div id="references" className="footnotes">
          <h4>Bibliographie</h4>
          <ul>
            {requestedSources &&
              requestedSources.map((s, index) => {
                if (s.isFootnote === true) {
                  return (
                    <li data-icon="→" key={s._id} id={index}>
                      <span className="source-list-item">
                        <span className="source-author">{s.author}</span>
                        <span className="source-year"> ({s.year}). </span>
                        <span className="source-title">{s.title}</span>{" "}
                        <span className="source-category">[{s.category}]</span>
                        <span className="source-edition">
                          &nbsp;({s.edition}
                          {s.edition === "1" ? "ère" : "ème"} éd.) 
                        </span>
                        <span className="source-editor">{s.editor}</span>.
                      </span>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PainArticle;
