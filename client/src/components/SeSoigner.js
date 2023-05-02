import React from "react";
import { HeadingArea } from "../utils/HeadingArea";
import { TitleLink } from "../utils/TitleLink";

const SInformer = () => {
  return (
    <div>
      <h1 className="invisible">S’informer</h1>
      <HeadingArea
        title="Avec des pros de la santé"
        subtitle="Des recommendations pour mieux vivre son parcours de soin."
      />
      <div className="ressources-container">
        <TitleLink to="annuaire" title="Annuaire de spécialistes" />
      </div>

      <HeadingArea title="Se réapproprier son corps en solo" />
      <div className="ressources-container">
        <TitleLink to="*" title="Exercices" />
        <TitleLink to="*" title="Plaisir" />
      </div>
    </div>
  );
};

export default SInformer;
