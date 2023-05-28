import React from "react";
import { Link } from "react-router-dom";

const Credits = () => {
  return (
    <div>
      <h1>Crédits</h1>
      <div className="title-aside-container">
        <h2 className="h3">Textes médicaux</h2>
        <div>
          <p>
            Les textes ont été rédigés par l’équipe de{" "}
            <Link
              to="https://www.instagram.com/medsexplain/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MedSexplain (AEMG)
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="title-aside-container">
        <h2 className="h3">Textes Sexologiques</h2>
        <div>
          <p>
            <Link
              to="https://www.sexopraxis.ch/romy-siegrist"
              target="_blank"
              rel="noopener noreferrer"
            >
              Romy Siegrist (Sexopraxis)
            </Link>
            <br />
            Auteurice des textes et exercices pour le lichen scléreux, la
            vulvodynie, la vaginite et mycose, l’utérus rétroversé.
          </p>
          <p>
            <Link
              to="https://www.sexopraxis.ch/fiona-bourdon"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fiona Bourdon (Sexopraxis)
            </Link>
            <br />
            Auteurice des textes et exercices pour le syndrome des ovaires
            polykistiques, la sécheresse vaginale, l’endométriose, le vaginisme.
          </p>
        </div>
      </div>
      <div className="title-aside-container">
        <h2 className="h3">Relecture et corrections</h2>
        <div>
          <strong>Laure Bonnevie</strong>
        </div>
      </div>
      <div className="title-aside-container">
        <h2 className="h3">Copyrights</h2>
        <div>
          <p>
            © Tous droits réservés. Il est interdit de reproduire, distribuer,
            modifier ou utiliser le contenu de{" "}
            <span className="logo">pvssy talk</span> sans l’autorisation du
            titulaire.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Credits;
