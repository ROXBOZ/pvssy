import React from "react";
import { Link } from "react-router-dom";
import Pains from "../components/Pains/Pains";

const SeSoigner = () => {
  return (
    <div>
      <div className="heading-area">
        <h1>Se soigner</h1>
        <p className="subtitle">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat unde
          eum animi non. Eaque, nobis vitae corrupti error aliquid nihil
          temporibus inventore necessitatibus, est cum dolorem laborum dolor,
          rerum corporis.
        </p>
      </div>
      <p style={{ backgroundColor: "red" }}>exercice/article de base</p>
      <Pains />

      <div className="heading-area">
        <p className="pretitle">Comprendre</p>
        <h2>Ressources</h2>
        <p className="subtitle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea enim harum
          voluptas ullam quos corporis esse ratione pariatur error, obcaecati
          cum, rem ab. Impedit, aut. Odio, molestias. Animi, totam voluptatem.
        </p>
        <p className="msg info">
          Les ressources sont également disponibles{" "}
          <Link to="/douleurs">par douleur</Link>.
        </p>
      </div>
      <p style={{ color: "red" }}>créer une url pour les ressources globales</p>

      <p>
        <Link to="glossaire">Glossaire entier (en construction) </Link>
      </p>
      <p>Toutes les Ressources </p>
      <p>Toutes les exercices </p>
    </div>
  );
};

export default SeSoigner;
