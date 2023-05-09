import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="grid-area">
      <div className="centered">
        <h1>Erreur 404</h1>
        <p>
          Cette page n’existe pas.{" "}
          <Link to="/">Retour à la page d’accueil</Link>.
          <br />
          Tu as détecté un bug ?{" "}
          <a href="mailto:info@pvssy-talk.org">Avertis nous par email</a>.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
