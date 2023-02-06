import React from "react";
import { Link } from "react-router-dom";
import Tutos from "../components/Tutos";
import Annuaire from "../components/Annuaire";
import Articles from "../components/Articles";
import Shemas from "../components/Shemas";

const Ressources = () => {
  return (
    <div>
      <h1>Ressources</h1>
      <p className="red">
        TUTOS et ANNUAIRE devraient être des blocs-liens redirectifs. ARTICLES
        ET SCHÉMAS peuvent-être des blocs-liens redirectifs ou des composants
        incorporés.
      </p>
      <p className="red">
        FILTRABLE par douleur – page déjà filtrée accessible depuis page douleur
      </p>
      <Tutos />
      <Annuaire />
      <Articles />
      <Shemas />
    </div>
  );
};

export default Ressources;
