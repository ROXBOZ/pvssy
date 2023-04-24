import React from "react";
import Pains from "../components/Pains/Pains";
import Ressources from "./Ressources";
import { HeadingArea } from "../utils/HeadingArea";

const Sinformer = () => {
  return (
    <div>
      <h1 className="invisible">S’informer</h1>
      <HeadingArea
        title="(Re)découvrir ton corps"
        level="h2"
        subtitle="Des pistes pour bien observer ton corps, l’écouter, et mieux localiser tes douleurs. Elles te seront utiles pour communiquer avec des pros de la santé lors d’une consultation ou avec un·e partenaire pendant un moment de plaisir."
      />
      <div className="grid-area">
        <div className="centered" style={{ color: "red" }}>
          articles globaux
        </div>
      </div>

      <HeadingArea
        title="Douleurs"
        subtitle="Chaque douleur est traitée avec une approche à la fois médicale et sexologique pour te donner une vision complète des douleurs."
        level="h2"
      />
      <Pains />

      <Ressources />
    </div>
  );
};

export default Sinformer;
