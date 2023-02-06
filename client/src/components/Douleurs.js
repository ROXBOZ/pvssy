import React from "react";
import { Link } from "react-router-dom";

const Douleurs = () => {
  return (
    <div>
      <h1>Douleurs</h1>
      <ul>
        <li>
          <Link to="/Douleur">Dyspareunie</Link>
        </li>
        <li>Vaginisme</li>
        <li>Vulvodynie/vestibulodynie/clitorodynie</li>
        <li>Mutilations vaginales</li>
        <li>Ovaires polykystiques</li>
        <li>Utérus rétroversé</li>
        <li>Dysphorie</li>
        <li>Cystite</li>
        <li>Lichen</li>
      </ul>
    </div>
  );
};

export default Douleurs;
