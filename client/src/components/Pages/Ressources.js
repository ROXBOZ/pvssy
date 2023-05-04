import React from "react";
import { useLocation } from "react-router-dom";
import { HeadingArea } from "../../utils/HeadingArea";
import { TitleLink } from "../../utils/TitleLink";

const Ressources = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithRessources = /ressources$/.test(currentUrl);

  return (
    <div>
      {endsWithRessources && <HeadingArea title="Ressources" level="h1" />}
      <div className="ressources-container">
        <TitleLink to="/s-informer/ressources/glossaire" title="Glossaire" />
        <TitleLink to="/s-informer/ressources/exercices" title="Exercices" />
        <TitleLink
          to="/s-informer/ressources/litterature-et-medias"
          title="Littérature et médias"
        />
        <TitleLink to="/s-informer/ressources/annuaire" title="Annuaire" />
      </div>
    </div>
  );
};

export default Ressources;
