import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pain = () => {
  const {
    requestedSources,
    painData,
    fetchSinglePain,
    fetchRelatedTerms,
    fetchRelatedSources,
  } = useContext(PainsContext);

  useEffect(() => {
    fetchSinglePain();
    fetchRelatedTerms();
    fetchRelatedSources();
  }, []);

  if (!painData) {
    return <div className="msg pending">Chargement...</div>;
  }

  return (
    <>
      <div className="heading-area">
        <p className="pretitle">Comprendre</p>
        <h1>{painData.name}</h1>
        <ul className="category-submenu">
          <strong>Ressources {painData.name} :</strong>{" "}
          <li>
            <Link to="*">Tutos</Link>
          </li>
          <li>
            <Link to="*">Articles</Link>
          </li>
          <li>
            <Link to="*">Shémas</Link>
          </li>
          <li>
            <Link to="lexique">Lexique</Link>
          </li>
        </ul>
      </div>

      <div>
        <img
          className="pain-illu-cover"
          src={painData.img}
          alt={painData.name}
        ></img>
        <div className="tabbed-navigation-container">
          <div className="tabbed-navigation">
            <NavLink
              to={{
                pathname: `/gerer-soi-meme/douleurs/${painData.name.toLowerCase()}/medicine`,
              }}
            >
              Médecine
            </NavLink>
            <NavLink
              to={{
                pathname: `/gerer-soi-meme/douleurs/${painData.name.toLowerCase()}/sexologie`,
              }}
            >
              Sexologie
            </NavLink>
          </div>
        </div>

        <Outlet />

        <div id="references" className="source-ref">
          <h4>Bibliographie</h4>
          <ol>
            {requestedSources &&
              requestedSources.map((s) => (
                <li key={s._id} id={s.title}>
                  <span className="source-author">{s.author}</span>
                  <span className="source-year"> ({s.year}). </span>
                  <span className="source-title">{s.title}</span>
                  <span className="source-edition">
                    &nbsp;({s.edition}
                    {s.edition === "1" ? "ère" : "ème"} éd.) 
                  </span>
                  <span className="editor">{s.editor}</span>.
                </li>
              ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Pain;
