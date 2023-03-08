import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, NavLink, Outlet, useOutlet } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pain = () => {
  const menuRef = useRef();
  const outlet = useOutlet();
  const [menuTop, setMenuTop] = useState(0);
  const {
    isSticky,
    setIsSticky,
    painData,
    painName,
    fetchSinglePain,
    fetchRelatedSources,
  } = useContext(PainsContext);

  useEffect(() => {
    fetchSinglePain(painName);
    fetchRelatedSources();
  }, []);

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
            Illustré par <Link to="/">Illustrateurice</Link>
          </span>
        </figure>

        {/* <div className="tabbed-navigation-banner"> */}
        {/* <div
            className={`tabbed-navigation-container  ${
              isSticky ? "sticky" : ""
            }`}
            ref={menuRef}
          >
            <div className="tabbed-navigation">
              <NavLink
                to={{
                  pathname: `medical`,
                }}
              >
                Médical
              </NavLink>
              <NavLink
                to={{
                  pathname: `sexologie`,
                }}
              >
                Sexologie
              </NavLink>
            </div>
          </div> */}

        {outlet ? (
          <Outlet />
        ) : (
          <>
            <div
              style={{
                backgroundColor: "yellow",
                margin: "5rem 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="pretitle">Approches</p>
              <Link to="medical">
                <h2>Médical</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus quo amet quaerat repellat, voluptatum reprehenderit
                  quod dolore ea dignissimos facilis cum cumque asperiores.
                  Praesentium delectus perspiciatis magnam repudiandae dolor
                  alias.
                </p>
              </Link>

              <Link to="sexologie">
                <h2>Sexologie</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus quo amet quaerat repellat, voluptatum reprehenderit
                  quod dolore ea dignissimos facilis cum cumque asperiores.
                  Praesentium delectus perspiciatis magnam repudiandae dolor
                  alias.
                </p>
              </Link>
            </div>
            <div className="card-grid">
              <Link to="lexique" className="link-card">
                <div className="card ressource">
                  <h3>Tutos</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </Link>
              <Link to="lexique" className="link-card">
                <div className="card ressource">
                  <h3>Shémas</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </Link>
              <Link to="lexique" className="link-card">
                <div className="card ressource">
                  <h3>Articles</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </Link>
              <Link to="lexique" className="link-card">
                <div className="card ressource">
                  <h3>Lexique</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </Link>
            </div>
          </>
        )}
        {/* </div> */}
      </>
    );
  }
};

export default Pain;
