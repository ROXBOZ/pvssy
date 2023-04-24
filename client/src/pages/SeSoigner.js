import React from "react";
import { HeadingArea } from "../utils/HeadingArea";
import { TitleLink } from "../utils/TitleLink";

const SInformer = () => {
  return (
    <div>
      <h1 className="invisible">S’informer</h1>
      <HeadingArea
        title="Avec des pros de la santé"
        subtitle="Des recommendations pour mieux vivre son parcours de soin"
      />
      <div className="ressources-container">
        <TitleLink to="annuaire" title="Annuaire" />
      </div>

      <HeadingArea title="Se réapproprier son corps solo" />
    </div>
  );
};

export default SInformer;
