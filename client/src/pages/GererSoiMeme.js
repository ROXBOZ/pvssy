import React from "react";
import Pains from "../components/Pains/Pains";
import Tutos from "../components/Tutos";
import Articles from "../components/Articles";

const GererSoiMeme = () => {
  return (
    <div>
      <h1>Gérer soi-même</h1>
      <Pains />
      <h2>Ressources</h2>
      <Tutos />
      <Articles />
      <h3>Shémas</h3>
      <h3>Lexique</h3>
    </div>
  );
};

export default GererSoiMeme;
