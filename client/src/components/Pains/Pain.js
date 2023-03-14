import React, { useContext, useEffect } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";

const Pain = () => {
  const outlet = useOutlet();
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

  if (!painData) {
    return <div className="msg pending">Chargement...</div>;
  } else {
    return (
      <>
        <div className="heading-area">
          <p className="pretitle">Comprendre</p>
          <h1>{painData.name}</h1>
        </div>

        {outlet ? (
          <Outlet />
        ) : (
          <>
            <p className="subtitle">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis
              culpa maxime autem porro iusto hic itaque officiis doloremque
              molestiae. Aliquam, temporibus cupiditate. Provident aut officia
              fugit natus consequuntur libero eveniet.
            </p>
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
                to="lexique"
                title="Lexique + Shémas"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
              />

              {/* <ResourceCard
                to="extras"
                title="Extras"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
              /> */}

              <ResourceCard
                to="exercices"
                title="Exercices sexo"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
              />

              <ResourceCard
                to="*"
                title="Tutos"
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
