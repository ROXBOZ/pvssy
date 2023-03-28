import { Link, NavLink } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import ShareThis from "../ShareThis";
import { createParagraph } from "../../utils/createParagraphs";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const PainArticle = () => {
  let currentURL = window.location.pathname;
  let articleRef = document.getElementById("articleRef");
  const submenuRef = useRef(null);
  const menuRef = useRef();
  const [, setAnchorPosition] = useState(0);
  const [menuTop, setMenuTop] = useState(0);
  const menstrualReminder = [
    " Pendant la seconde phase, nommée phase lutéale, la progestérone va induire une modification des cellules de l’endomètre qui vont former des glandes sécrétant des nutriments qui vont permettre la survie de l’embryon en cas d’implantation. Sans implantation, la progestérone va chuter après 10 jours, ce qui va provoquer une contraction des artères de l’endomètre ce qui va induire une diminution de l’arrivée de sang dans le tissu et la mort des cellules qui vont partir avec les menstruations et laisser un endomètre très fin.",
  ];
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
  const scrollToArticle = () => {
    articleRef.scrollIntoView({
      behavior: "smooth",
    });
  };

  const highlightParagraphs = (arr) => {
    if (!highlightedTerms || highlightedTerms.length === 0) {
      return createParagraph(arr);
    }

    return arr.map((p, index) => {
      highlightedTerms.forEach((term) => {
        const regexTerm = new RegExp(term, "ig");
        p = p.replaceAll(
          regexTerm,
          `[${term}](../glossaire/#${term.replace(/\s+/g, "-").toLowerCase()})`
        );
      });

      highlightedSources.forEach((source) => {
        if (source.toLowerCase() !== painData.name.toLowerCase()) {
          const regexSource = new RegExp(source, "ig");
          p = p.replaceAll(
            regexSource,
            `[${source}](${currentURL}/#references)`
          );
        }
      });

      return (
        <ReactMarkdown
          components={{
            a: ({ children, href }) => {
              const isTerm = href.includes("glossaire");
              const isSource = href.includes("reference");
              const onClickHandler = (event) => {
                event.preventDefault();
                scrollToAnchor("references");
              };
              return (
                <Link
                  className={isTerm ? "term" : isSource ? "source" : ""}
                  to={href}
                  onClick={isSource ? onClickHandler : null}
                >
                  {children}
                  {isTerm && <span> ↗</span>}
                </Link>
              );
            },
          }}
        >
          {p}
        </ReactMarkdown>
      );
    });
  };

  // FIXME Scroll down to ressources and sources, it repeats also in glossary
  const scrollToAnchor = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });
      setAnchorPosition(top);
      setMenuTop(top);
    }
  };

  // FIXME menus stick // repeats on glossaire page
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

      <div className="article-container" id="articleRef">
        <div className="auteurice">
          <div className="img-holder" />
          <em>
            par{" "}
            {isMed ? (
              <Link to="https://aemg-ge.com/">Medsexplain</Link>
            ) : (
              <Link to="https://aemg-ge.com/">Fiona Bourdon</Link>
            )}
          </em>
        </div>

        <ul
          className={`category-submenu ${isSticky ? "fixed" : ""}`}
          ref={submenuRef}
        >
          <ShareThis />
          <p className="h4">
            Ressources
            <br />
            {painData.name === "Sopk" ? (
              <span className="acronym">{painData.name}</span>
            ) : (
              <span> {painData.name}</span>
            )}
            <br />
          </p>

          <li>
            <Link to="../glossaire">Glossaire</Link>
          </li>
          <li>
            <Link to="../exercices">Exercices</Link>
          </li>
          <li>
            <Link to="../suggestions">Suggestions</Link>
          </li>
        </ul>

        {isMed ? (
          <div className="article">
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
            {painData.auto.length > 0 ? (
              <>
                <h2>Que puis-je faire solo ?</h2>
                {highlightParagraphs(painData.auto)}
              </>
            ) : (
              <></>
            )}

            <h2>Comment me soigner ?</h2>
            {painData.proIntro && highlightParagraphs(painData.proIntro)}
            {painData.pros &&
              painData.pros.map((pro) => {
                return (
                  <>
                    {pro.proTitle && <h3>{pro.proTitle}</h3>}
                    {pro.proDef && highlightParagraphs(pro.proDef)}
                  </>
                );
              })}
          </div>
        ) : (
          <div className="article">
            <h2>Lien à soi</h2>
            <h3>Image /schéma corporel</h3>
            {highlightParagraphs(painData.body)}
            <h3>Normes genrées</h3>
            {highlightParagraphs(painData.norms)}

            {painData.tags.includes("règles") && (
              <div className="menstrual-reminder">
                <h3>Rappel sur le cycle menstruel</h3>
                {highlightParagraphs(menstrualReminder)}
              </div>
            )}
            <h3>Vie quotidienne</h3>
            {highlightParagraphs(painData.routine)}
            <h2>Libido</h2>
            {highlightParagraphs(painData.libido)}
            <h3>Charge mentale et communication</h3>
            {highlightParagraphs(painData.charge)}
            <h3>Sexe et consentement</h3>
            {highlightParagraphs(painData.consent)}
            <h2>Santé mentale</h2>
            {highlightParagraphs(painData.mental)}
            <h2>Parentalité</h2>
            {highlightParagraphs(painData.parenthood)}
            <h2>Avec les pros de la santé</h2>
            {highlightParagraphs(painData.checkup)}
            <h2>Traitement</h2>
            {highlightParagraphs(painData.treatment)}
            <h2>Plaisir / anti-douleur</h2>
            {highlightParagraphs(painData.pleasure)}
          </div>
        )}

        {requestedSources && (
          <>
            {requestedSources.some((s) => s.isFootnote) && (
              <div id="references" className="footnotes">
                <h4>Bibliographie</h4>
                <ul>
                  {requestedSources.map((s, index) => {
                    if (s.isFootnote === true) {
                      return (
                        <li data-icon="→" key={s._id} id={index}>
                          <span className="source-list-item">
                            <span className="source-author">{s.author}</span>
                            <span className="source-year"> ({s.year}). </span>
                            <span className="source-title">
                              {s.url ? (
                                <Link to={s.url}>{s.title}</Link>
                              ) : (
                                <span>{s.title}</span>
                              )}
                            </span>{" "}
                            <span className="source-category">
                              [{s.category}]
                            </span>{" "}
                            {s.edition && (
                              <span className="source-edition">
                                {" "}
                                ({s.edition}
                                {s.edition === "1" ? "ère" : "ème"} éd.){" "}
                              </span>
                            )}
                            <span className="source-editor">{s.editor}</span>.
                          </span>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PainArticle;
