import { Link, NavLink } from "react-router-dom";
import { PainsContext } from "../contexts/PainsContext";
import ShareThis from "../utilities/ShareThis";
import { createParagraph } from "../utilities/createParagraphs";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const Article = () => {
  let currentURL = window.location.pathname;
  let articleRef = document.getElementById("articleRef");
  const submenuRef = useRef(null);
  const menuRef = useRef();
  const [, setAnchorPosition] = useState(0);
  const [menuTop, setMenuTop] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const menstrualReminder = [
    " Pendant la seconde phase, nommée phase lutéale, la progestérone va induire une modification des cellules de l’endomètre qui vont former des glandes sécrétant des nutriments qui vont permettre la survie de l’embryon en cas d’implantation. Sans implantation, la progestérone va chuter après 10 jours, ce qui va provoquer une contraction des artères de l’endomètre ce qui va induire une diminution de l’arrivée de sang dans le tissu et la mort des cellules qui vont partir avec les menstruations et laisser un endomètre très fin.",
  ];

  // const imgSrc = (painName, section, num) => {
  //   try {
  //     return require(`../assets/images/shemas/${painName}-${section}-${num}.png`);
  //   } catch (error) {
  //     return "";
  //   }
  // };

  const { isMed, setIsMed, painData, requestedTerms, requestedSources } =
    useContext(PainsContext);

  const highlightedTerms = requestedTerms
    ? requestedTerms.map((term) => term.term)
    : [];
  const highlightedSources = requestedSources
    ? requestedSources.map((source) => source.title)
    : [];

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

  useLayoutEffect(() => {
    if (menuRef.current) {
      setMenuTop(menuRef.current.offsetTop);
    }
  }, [menuRef.current]);

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
          `[${term}](../glossaire/#${term
            .replace(/\s+/g, "-")
            .replaceAll("é", "e")
            .replace("è", "e")
            .replace("œ", "oe")
            .toLowerCase()})`
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
                  key={index}
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
  useLayoutEffect(() => {
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
        <div
          className={`category-submenu ${
            window.innerWidth > 992 && isSticky ? "fixed" : ""
          }`}
          ref={submenuRef}
        >
          <div>
            {window.innerWidth < 576 && (
              <p className="h4" style={{ paddingTop: "2rem" }}>
                Partager cette page
              </p>
            )}
            <ShareThis />
          </div>
          <div>
            <p className="h4">
              Ressources
              <br />
              {painData.name === "Sopk" ? (
                <span className="acronym">{painData.name}</span>
              ) : (
                <span> {painData.name}</span>
              )}
            </p>
            <ul>
              <li>
                <Link to="../glossaire">Glossaire</Link>
              </li>
              <li>
                <Link to="../exercices">Exercices</Link>
              </li>
              <li>
                <Link to="../litterature-et-medias">Littérature et médias</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {isMed ? (
            <div className="article">
              {painData.def && painData.def.length > 0 && (
                <>
                  <h2>Définition</h2>
                  {highlightParagraphs(painData.def)}
                </>
              )}

              {[1, 2].map((num, index) => {
                const shemaDef = painData[`shemaDef${num}`];

                return (
                  shemaDef.length > 0 && (
                    <figure key={index} className="shema-container">
                      <img
                        className="shema"
                        src={shemaDef[0]}
                        alt={`shéma ${painData.name} : ${shemaDef[1]}`}
                      />
                      <figcaption>{shemaDef[1]}</figcaption>
                    </figure>
                  )
                );
              })}

              {painData.tags.includes("règles") && (
                <div className="menstrual-reminder">
                  <div>
                    <h3>Rappel sur le cycle menstruel</h3>
                    {highlightParagraphs(menstrualReminder)}
                  </div>
                  <figure>
                    <img
                      src={require(`../assets/images/shemas/menstruation-reminder.png`)}
                      alt={`shéma ${painData.name}`}
                    />

                    <figcaption>
                      <strong>Shéma sur le cycle menstruel</strong> : Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit. Cumque
                      asperiores nobis in omnis labore necessitatibus unde
                      impedit, nesciunt maxime earum iure deleniti explicabo
                      similique, quaerat quae, aspernatur libero placeat
                      temporibus?
                    </figcaption>
                  </figure>
                </div>
              )}

              {painData.diag && painData.diag.length > 0 && (
                <>
                  <h2>Diagnostic</h2>
                  {highlightParagraphs(painData.diag)}
                </>
              )}

              {painData.sympt && painData.sympt.length > 0 && (
                <>
                  <h2>Symptômes</h2>
                  {highlightParagraphs(painData.sympt)}
                </>
              )}

              {painData.why && painData.why.length > 0 && (
                <>
                  <h2>Pourquoi ça m’arrive ?</h2>
                  {highlightParagraphs(painData.why)}
                </>
              )}

              <h2>Comment me soigner ?</h2>
              <p style={{ color: "red" }}>!!!ERROR RESTRUCTURE</p>

              {painData.auto && painData.auto.length > 0 && (
                <>
                  <h3>Que puis-je faire solo ?</h3>
                  {highlightParagraphs(painData.auto)}
                </>
              )}

              {painData.proIntro && painData.proIntro.length > 0 && (
                <>
                  <h3>Qui consulter ?</h3>
                  {painData.proIntro && highlightParagraphs(painData.proIntro)}
                </>
              )}

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
              <h2>Ma vie avec la douleur</h2>
              {painData.body && painData.body.length > 0 && (
                <>
                  <h3>Moi et mon corps</h3>
                  {highlightParagraphs(painData.body)}
                </>
              )}
              {painData.norms && painData.norms.length > 0 && (
                <>
                  <h3>Normes genrées</h3>
                  {highlightParagraphs(painData.norms)}
                </>
              )}
              {painData.routine && painData.routine.length > 0 && (
                <>
                  <h3>Vie quotidienne</h3>
                  {highlightParagraphs(painData.routine)}
                </>
              )}
              <h2>Libido</h2>
              {painData.libido && painData.libido.length > 0 && (
                <>{highlightParagraphs(painData.libido)}</>
              )}
              {painData.charge && painData.charge.length > 0 && (
                <>
                  <h3>Charge mentale et communication</h3>
                  {highlightParagraphs(painData.charge)}
                </>
              )}

              {painData.consent && painData.consent.length > 0 && (
                <>
                  <h3>Sexe et consentement</h3>
                  {highlightParagraphs(painData.consent)}
                </>
              )}

              {painData.mental && painData.mental.length > 0 && (
                <>
                  <h2>Santé mentale</h2>
                  {highlightParagraphs(painData.mental)}
                </>
              )}

              {painData.parenthood && painData.parenthood.length > 0 && (
                <>
                  <h2>Parentalité</h2>
                  {highlightParagraphs(painData.parenthood)}
                </>
              )}

              {painData.checkup && painData.checkup.length > 0 && (
                <>
                  <h2>Avec les pros de la santé</h2>
                  {highlightParagraphs(painData.checkup)}
                </>
              )}

              {painData.treatment && painData.treatment.length > 0 && (
                <>
                  <h2>Quels soins pour me soulager</h2>
                  {highlightParagraphs(painData.treatment)}
                </>
              )}

              {painData.pleasure && painData.pleasure.length > 0 && (
                <>
                  <h2>Plaisir / anti-douleur</h2>
                  {highlightParagraphs(painData.pleasure)}
                </>
              )}
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
                                  ({s.edition}
                                  <sup>{s.edition === "1" ? "ère" : "ème"}</sup>
                                  éd.)
                                </span>
                              )}{" "}
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
      </div>
    </>
  );
};

export default Article;
