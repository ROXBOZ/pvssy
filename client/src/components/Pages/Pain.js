import React, { useContext, useEffect } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utilities/HeadingArea";
import { TitleLink } from "../../utilities/TitleLink";
import { Helmet } from "react-helmet";

const Pain = () => {
  const outlet = useOutlet();
  const { painData, painName, fetchSinglePain, fetchRelatedSources } =
    useContext(PainsContext);

  useEffect(() => {
    fetchSinglePain(painName);
    fetchRelatedSources();
  }, []);

  if (!painData) {
    return <div className="msg pending">Chargement...</div>;
  } else {
    return (
      <>
        <Helmet>
          <title>{painName} – Pvssy Talk</title>
          <meta
            name="description"
            content={`${painName}: médecine, sexologie, ressources `}
          />
        </Helmet>

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
              <TitleLink
                to="litterature-et-medias"
                title="Littérature et médias"
              />
            </div>
          </>
        )}
      </>
    );
  }
};

export default Pain;
