import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useOutlet } from "react-router-dom";
// import { Link } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pain = () => {
  const { painData, painName, fetchSinglePain, fetchRelatedSources } =
    useContext(PainsContext);

  useEffect(() => {
    fetchSinglePain(painName);
  }, []);

  const menuRef = useRef();
  const [isSticky, setIsSticky] = useState(false);

  const [menuTop, setMenuTop] = useState(0);
  useEffect(() => {
    setMenuTop(menuRef.current.offsetTop);
  }, []);

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

  const outlet = useOutlet();

  useEffect(() => {
    fetchRelatedSources();
  }, []);

  if (!painData) {
    return <div className="msg pending">Chargement...</div>;
  } else {
    return (
      <>
        <div className="heading-area">
          <p className="pretitle">Comprendre</p>
          <h1>{painData.name}</h1>
        </div>

        <figure>
          <img
            className="pain-illu-cover"
            src={painData.img}
            alt={painData.name}
          />
          <span>
            par <Link to="/">Illustration</Link>, 2023
          </span>
        </figure>

        <div className="tabbed-navigation-banner">
          <div
            className={`tabbed-navigation-container  ${
              isSticky ? "sticky" : ""
            }`}
            ref={menuRef}
          >
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
              sexologie. Tu peux consulter les deux approches et combiner selon
              ce qui te parle le plus. Pvssy Talk s’engage à ne pas soutenir une
              approche plus que l’autre.
            </p>
          )}
        </div>
      </>
    );
  }
};

export default Pain;
