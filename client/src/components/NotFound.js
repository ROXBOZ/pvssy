import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="title-aside-container">
        <h1>Erreur 404</h1>
        <div>
          <p>
            Une erreur s’est produite ou cette page n’existe plus.{" "}
            <Link to="/">Retour à la page d’accueil</Link>.
            <br />
            Tu as détecté un bug ?{" "}
            <a href="mailto:hello@pvssy-talk.org">Avertis nous par email</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
