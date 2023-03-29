import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HeadingArea } from "../utils/HeadingArea";

const Ressources = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithRessources = /ressources$/.test(currentUrl);
  const ResourceCard = ({ to, title, description }) => (
    <Link to={to} className="link-card ressource">
      <div className="card ">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );

  return (
    <div>
      {endsWithRessources && (
        <HeadingArea
          pretitle="comprendre"
          title="Ressources"
          subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores nesciunt expedita ullam fuga dolorum architecto explicabo repudiandae hic perspiciatis alias sit laboriosam assumenda esse, dolores ab dolorem, possimus nam voluptatibus."
          level="h1"
        />
      )}

      <div className="card-grid">
        <ResourceCard
          to="/s-informer/ressources/glossaire"
          title="Glossaire"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <ResourceCard
          to="/s-informer/ressources/exercices"
          title="Exercices"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <ResourceCard
          to="/s-informer/ressources/suggestions"
          title="Suggestions"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
      </div>
    </div>
  );
};

export default Ressources;
