import React from "react";
import { Helmet } from "react-helmet";

const Members = () => {
  return (
    <div>
      <Helmet>
        <title>Devenir membre Pvssy Talk</title>
        <meta
          name="description"
          content="Devenir membre de Pvssy Talk pour soutenir notre travail et nous permettre de continuer à offrir des ressources gratuites et accessibles à toustes."
        />
      </Helmet>
      <div className="title-aside-container">
        <h1>Devenir membre</h1>
        <div>
          <p className="subtitle">
            Le projet <span className="logo">pvssy talk</span> est porté par
            l'association No Dolor, qui a pour but d’informer sur la sexualité
            et les douleurs sexuelles. Pour devenir membre, il suffit d'en faire
            la demande qui sera ensuite approuvée par le Comité.
          </p>
        </div>
      </div>

      <div className="title-aside-container">
        <h2 className="h3">Membres actifs</h2>
        <div>
          Membres individuels ou membres collectifs engagés activement dans la
          réalisation des buts de l’association, qui disposent chacun d’une voix
          à l'Assemblée générale.
        </div>
      </div>
      <div className="title-aside-container">
        <h2 className="h3">Membres de soutien</h2>
        <div>
          <p>
            Membres soutenant financièrement l’association, qui n’ont pas droit
            de vote à l'Assemblée générale.
          </p>
        </div>
      </div>
      <div className="title-aside-container">
        <h2 className="h3">Cotisations</h2>
        <div>
          <p>
            Les membres payent une cotisation annuelle (25.- pour les membres
            individuels; 100.- pour les membres collectifs) de soutien à
            l'association.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Members;
