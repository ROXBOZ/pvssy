import React from "react";
import { Helmet } from "react-helmet";

const Donate = () => {
  return (
    <div>
      <Helmet>
        <title>Faire un don à Pvssy Talk</title>
        <meta
          name="description"
          content="Faire un don à Pvssy Talk pour soutenir notre travail et nous permettre de continuer à offrir des ressources gratuites et accessibles à toustes."
        />
      </Helmet>
      <div className="title-aside-container">
        <h1>
          Faire un don
          <br />
          <img
            className="don-merci-img"
            src={require(`../../assets/images/don-merci.png`)}
            alt="Merci"
          />
        </h1>

        <div>
          <p className="subtitle">
            L’association No Dolor a pour but de sensibiliser sur la question
            des douleurs sexuelles. Si vous êtes sensible ou touché·ex par la
            question et souhaitez nous soutenir, vos dons nous seront
            particulièrement utiles pour mener à bien le développement de{" "}
            <span className="logo">pvssy talk</span> et les projets qui en
            découlent.
          </p>
        </div>
      </div>

      <div className="title-aside-container">
        <h2 className="h3">Montants suggérés</h2>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span className="highlight">50</span>
          <span className="highlight">100</span>
          <span className="highlight">150</span>
          <span className="highlight">300</span>ou montant de votre choix
        </div>
      </div>
      <div className="title-aside-container">
        <h2 className="h3">Modes de paiement</h2>
        <div>
          <p style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button disabled>TWINT</button>
            <button disabled>PayPal</button>
            <span>bientôt disponible</span>
          </p>
          <br />

          <p>
            <strong>Virement bancaire</strong>
            <br />
            Association No Dolor
            <br />
            Banque Raiffeisen
            <br />
            IBAN : CH18 8080 8006 6171 7604 4
            <br />
            (N’oubliez pas d'indiquez vos coordonnées pour recevoir un reçu de
            don.)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
