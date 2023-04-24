import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HeadingArea } from "../utils/HeadingArea";

const Ressources = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithRessources = /ressources$/.test(currentUrl);
  const Resource = ({ to, title }) => (
    <Link to={to}>
      <h3 className="ressource">{title}</h3>
    </Link>
  );

  return (
    <div>
      {endsWithRessources && (
        <HeadingArea title="Ressources" subtitle="Pour aller plus loin..." />
      )}
      <div className="ressources-container">
        <Resource to="/s-informer/ressources/glossaire" title="Glossaire" />
        <Resource to="/s-informer/ressources/exercices" title="Exercices" />
        <Resource
          to="/s-informer/ressources/recommendations"
          title="Recommendations"
        />
      </div>
    </div>
  );
};

export default Ressources;
