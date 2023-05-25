import React from "react";
import { useLocation } from "react-router-dom";
import { HeadingArea } from "../../utilities/HeadingArea";
import { TitleLink } from "../../utilities/TitleLink";
import { Helmet } from "react-helmet";

const Ressources = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithRessources = /ressources$/.test(currentUrl);

  return (
    <div>
      <div className="title-aside-container">
        {endsWithRessources ? (
          <>
            <Helmet>
              <title>Ressources – Pvssy Talk</title>
              <meta
                name="description"
                content="Glossaire, Exercices, Littérature et médias, Annuaire en lien avec les douleurs sexuelles."
              />
            </Helmet>
            <h1>Ressources supplémentaires</h1>
          </>
        ) : (
          <h2>Ressources supplémentaires</h2>
        )}

        <div className="ressources-container">
          <TitleLink to="ressources/glossaire" title="Glossaire" />
          <TitleLink to="ressources/exercices" title="Exercices" />
          <TitleLink
            to="ressources/litterature-et-medias"
            title="Littérature et médias"
          />
        </div>
      </div>
    </div>
  );
};

export default Ressources;
