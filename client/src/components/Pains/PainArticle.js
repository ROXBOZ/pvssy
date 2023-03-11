import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, NavLink } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const PainArticle = () => {
  let currentURL = window.location.pathname;
  let sourceCounter = 0;
  const submenuRef = useRef(null);
  const menuRef = useRef();
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

  const scrollToAnchor = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const highlightedTerms = requestedTerms
    ? requestedTerms.map((term) => term.term)
    : [];
  const highlightedSources = requestedSources
    ? requestedSources.map((source) => source.title)
    : [];

  const highlightParagraphs = (arr) => {
    const regex = new RegExp(
      `\\b(${highlightedTerms.join("|")}|${highlightedSources.join("|")})\\b`,
      "ig"
    );

    return arr.map((p, index) => {
      if (typeof p === "string") {
        const parts = p.split(regex);

        return (
          <p key={index}>
            {parts.map((part, index) => {
              if (regex.test(part)) {
                const isTerm = highlightedTerms.includes(part);
                const linkTo = isTerm
                  ? `../lexique/#${part
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`
                  : `${currentURL}/#references`;
                if (isTerm) {
                  return (
                    <Link className="term" key={`${part}-${index}`} to={linkTo}>
                      {part}
                    </Link>
                  );
                } else {
                  sourceCounter++;
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
                      {/* <sup>{sourceCounter}</sup> */}
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

  useLayoutEffect(() => {
    if (menuRef.current) {
      setMenuTop(menuRef.current.offsetTop);
    }
  }, [menuRef.current]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const isScrolledPast = scrollY > menuTop;
      setIsSticky(isScrolledPast);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuTop]);

  let articleRef = document.getElementById("articleRef");
  const scrollToArticle = () => {
    articleRef.scrollIntoView({
      behavior: "smooth",
    });
  };

  const mokeParagraphSexo = [
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus facilis assumenda explicabo, eius, deserunt illo eos architecto nihil? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam labore modi iusto.",
    "Lorem ipsum, dolir sit amet consectetur adipisicing elit. Quisquam labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus facilis assumenda explicabo, eius, deserunt illo eos architecto nihil? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam labore modi iusto.",
    "Lorem ipsum, dolur sit amet consectetur adipisicing elit. Quisquam labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus facilis assumenda explicabo, eius, deserunt illo eos architecto nihil? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam labore modi iusto.",
  ];
  const mokeParagraphSexo2 = [
    "Lorem ipsum, Test ref sit amet consectetur adipisicing elit. Quisquam labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus facilis assumenda explicabo, eius, deserunt illo eos architecto nihil? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam labore modi iusto.",
  ];

  return (
    <>
      <figure>
        <img
          className="pain-illu-cover"
          src={painData.img}
          alt={painData.name}
        />
        <span>
          Illustré par <Link to="*">Noémie Creux</Link>
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
              <Link to="https://aemg-ge.com/">Fiona Bourdon</Link>
            )}
          </em>
        </div>
        <ul
          className={`category-submenu ${isSticky ? "fixed" : ""}`}
          ref={submenuRef}
        >
          <p className="h4">
            Ressources
            <br />
            {painData.name}
          </p>
          <li>
            <Link to="*">Exercices</Link>
          </li>
          <li>
            <Link to="*">Extras</Link>
          </li>
          <li>
            <Link to="../lexique">Lexique</Link>
          </li>
          <li>
            <Link to="*">Shémas</Link>
          </li>
          <li>
            <Link to="*">Tutos</Link>
          </li>
          <li style={{ backgroundColor: "yellow" }} className="copy-link">
            <FontAwesomeIcon id="link-icon" icon={faLink} /> copier le lien
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
            <h2>Pourquoi ça m’arrive ?</h2>
            {highlightParagraphs(painData.why)}
            <h2>Que puis-je faire seule ?</h2>
            {highlightParagraphs(painData.auto)}
            <h2>Quelles aides existent ?</h2>
            <p>{painData.pro.intro}</p>
            {painData.pro.gyne && (
              <>
                <h3>Gynécologue</h3>
                <p>{painData.pro.gyne}</p>
              </>
            )}
            {painData.pro.kine && (
              <>
                <h3>Kinésithérapeute</h3>
                <p>{painData.pro.kine}</p>
              </>
            )}
            {painData.pro.psyc && (
              <>
                <h3>Psychologue</h3>
                <p>{painData.pro.psyc}</p>
              </>
            )}
            {painData.pro.sexo && (
              <>
                <h3>Sexologue</h3>
                <p>{painData.pro.sexo}</p>
              </>
            )}
          </>
        ) : (
          <>
            <h2>Lien à soi</h2>
            <h3>Image /schéma corporel</h3>
            <p>{highlightParagraphs(mokeParagraphSexo)}</p>

            <h3>Normes genrées</h3>
            <p>{highlightParagraphs(mokeParagraphSexo)}</p>
            <h3>Vie quotidienne</h3>
            <p>{highlightParagraphs(mokeParagraphSexo)}</p>
            <h2>Libido</h2>
            <p>{highlightParagraphs(mokeParagraphSexo)}</p>
            <h3>
              Charge mentale / communication /
              <br />
              consentement
            </h3>
            <p>{highlightParagraphs(mokeParagraphSexo)}</p>
            <h2>Santé mentale</h2>
            <p>{highlightParagraphs(mokeParagraphSexo)}</p>
            <h2>Parentalité</h2>
            <p>{highlightParagraphs(mokeParagraphSexo)}</p>
            <h2>Avec les pros</h2>
            <p>{highlightParagraphs(mokeParagraphSexo)}</p>
            <h2>Plaisir / anti-douleur</h2>
            <p>{highlightParagraphs(mokeParagraphSexo2)}</p>
            <p>{highlightParagraphs(mokeParagraphSexo)}</p>
          </>
        )}
        <div id="references" className="source-ref">
          <h4>Sources</h4>
          <ul role="list">
            {requestedSources &&
              requestedSources.map((s) => (
                <li data-icon="→" key={s._id} id={s.title}>
                  <span className="source-list-item">
                    <span className="source-author">{s.author}</span>
                    <span className="source-year"> ({s.year}). </span>
                    <span className="source-title">{s.title}</span>
                    <span className="source-edition">
                      &nbsp;({s.edition}
                      {s.edition === "1" ? "ère" : "ème"} éd.) 
                    </span>
                    <span className="editor">{s.editor}</span>.
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PainArticle;
