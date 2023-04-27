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
        <p style={{ color: "red" }}>
          les articles "globaux" devraient avoir ni l'aspect des articles
          douleurs ni l'aspect des lien "ressources"
        </p>
        <TitleLink to="annuaire" title="Annuaire de spécialistes" />
      </div>

      <HeadingArea title="Se réapproprier son corps en solo" />
      <div className="ressources-container">
        <TitleLink to="*" title="Exercices" />
        <p style={{ color: "red" }}>
          appeler ça autrement? c'est quoi la diff entre les exercices ici et
          ceux des douleurs?
        </p>
        <TitleLink to="*" title="Plaisir" />
      </div>
    </div>
  );
};

export default SInformer;
