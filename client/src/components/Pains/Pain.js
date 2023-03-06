import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useOutlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pain = () => {
  const { painData, fetchRelatedSources } = useContext(PainsContext);
  const outlet = useOutlet();

  useEffect(() => {
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
                pathname: `medical`,
                state: { articleId: "article-medical" },
              }}
            >
              Médical
            </NavLink>
            <NavLink
              to={{
                pathname: `sexologie`,
                state: { articleId: "article-sexologie" },
              }}
            >
              Sexologie
            </NavLink>
          </div>
        </div>
        {outlet ? (
          <Outlet />
        ) : (
          <p className="msg info">
            Pvssy Talk propose deux approches bien distinctes mais
            complémentaires, l’une issue de la médecine et l’autre de la
            sexologie. Tu peux consulter les deux approches et combiner selon ce
            qui te parle le plus. Pvssy Talk s’engage à ne pas soutenir une
            approche plus que l’autre.
          </p>
        )}
      </div>
    </>
  );
};

export default Pain;
