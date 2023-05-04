import React, { useContext, useEffect } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utils/HeadingArea";
import { TitleLink } from "../../utils/TitleLink";

const Pain = () => {
  const outlet = useOutlet();
  const { painData, painName, fetchSinglePain, fetchRelatedSources } =
    useContext(PainsContext);

  useEffect(() => {
    fetchSinglePain(painName);
    fetchRelatedSources();
  }, []);

  // const ArticleLink = ({ to, title, description }) => {
  //   const scrollToTop = () => {
  //     window.scrollTo(0, 0);
  //   };

  //   return (
  //     <Link className="link-card article" to={to} onClick={scrollToTop}>
  //       <div className="card">
  //         <h2>{title}</h2>
  //         <p>{description}</p>
  //       </div>
  //     </Link>
  //   );
  // };

  // const ResourceCard = ({ to, title, description }) => (
  //   <Link to={to} className="link-card ressource">
  //     <div className="card ">
  //       <h3>{title}</h3>
  //     </div>
  //   </Link>
  // );

  if (!painData) {
    return <div className="msg pending">Chargement...</div>;
  } else {
    return (
      <>
        <HeadingArea title={painName} level="h1" />

        {outlet ? (
          <Outlet />
        ) : (
          <>
            <div className="ressources-container">
              <TitleLink to="medical" title="Médical" />
              <TitleLink to="sexologie" title="Sexologie" />
              <TitleLink to="glossaire" title="Glossaire" />
              <TitleLink to="exercices" title="Exercices" />
              <TitleLink to="recommendations" title="Littérature et médias" />
              <TitleLink to="annuaire" title="Annuaire" />
            </div>
          </>
        )}
      </>
    );
  }
};

export default Pain;
