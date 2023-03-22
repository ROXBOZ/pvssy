import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pain = () => {
  const outlet = useOutlet();
  const [anchorPosition, setAnchorPosition] = useState(0);

  const { painData, painName, fetchSinglePain, fetchRelatedSources } =
    useContext(PainsContext);

  useEffect(() => {
    fetchSinglePain(painName);
    fetchRelatedSources();
  }, []);

  const ArticleLink = ({ to, title, description }) => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    return (
      <Link className="link-card article" to={to} onClick={scrollToTop}>
        <div className="card">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </Link>
    );
  };
  const ResourceCard = ({ to, title, description }) => (
    <Link to={to} className="link-card ressource">
      <div className="card ">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );

  const scrollToAnchor = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });
      setAnchorPosition(top);
    }
  };

  if (!painData) {
    return <div className="msg pending">Chargement...</div>;
  } else {
    return (
      <>
        <div className="heading-area">
          <p className="pretitle">Douleur</p>
          <h1>{painData.name}</h1>
        </div>

        {outlet ? (
          <Outlet />
        ) : (
          <>
            <div className="card-grid">
              <ArticleLink
                to="medical"
                title="Médical"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quo amet quaerat repellat, voluptatum reprehenderit quod dolore ea dignissimos facilis cum cumque asperiores. Praesentium delectus perspiciatis magnam repudiandae dolor alias."
              />

              <ArticleLink
                to="sexologie"
                title="Sexologie"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quo amet quaerat repellat, voluptatum reprehenderit quod dolore ea dignissimos facilis cum cumque asperiores. Praesentium delectus perspiciatis magnam repudiandae dolor alias."
              />

              <ResourceCard
                to="glossaire"
                title="Glossaire"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
              />

              <ResourceCard
                to="exercices"
                title="Exercices"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
              />

              <ResourceCard
                to="medical/#ressources"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToAnchor("ressources");
                }}
                title="Ressources"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
              />
            </div>
          </>
        )}
      </>
    );
  }
};

export default Pain;
