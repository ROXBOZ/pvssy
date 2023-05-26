import React from "react";
import { TitleLink } from "../../utilities/TitleLink";
import { Helmet } from "react-helmet";

const Ressources = () => {
  return (
    <div>
      <Helmet>
        <title>Ressources – Pvssy Talk</title>
        <meta
          name="description"
          content="Glossaire, Exercices, Littérature et médias, Annuaire en lien avec les douleurs sexuelles."
        />
      </Helmet>
      <div className="title-aside-container">
        <h1>Ressources supplémentaires</h1>
        <div className="ressources-container">
          <TitleLink to="glossaire" title="Glossaire" />
          <TitleLink to="exercices" title="Exercices" />
          <TitleLink to="litterature-et-medias" title="Littérature et médias" />
        </div>
      </div>
    </div>
  );
};

export default Ressources;
