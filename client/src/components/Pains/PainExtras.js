import React from "react";
import { useLocation } from "react-router-dom";

const PainExtras = () => {
  let location = useLocation();
  const painName =
    location.pathname
      .split(/\/|#/)
      .filter((item) => item !== "")
      .slice(-2, -1)[0]
      .slice(0, 1)
      .toUpperCase() +
    location.pathname
      .split(/\/|#/)
      .filter((item) => item !== "")
      .slice(-2, -1)[0]
      .slice(1);

  return (
    <div>
      <div className="heading-area">
        <p className="pretitle">Extras</p>
        <h1>{painName}</h1>
        <p>
          - podcast "Vaginisme & Co." - podcast "Exploratrice de l'intime :
          Vaginisme, pourquoi la pénétration est impossible" - Livre "Vagin
          Tonic" - podcast "Quoi de Meuf "Vaginisme & Dyspareunies : la fin du
          déni ?" - Livre "Slow love & Sex Méditation" Emmanuelle Duchesne -
          livre "Notre corps, nous mêmes" - site : www.lesclesdevenus.org -
          video 3d plancher pelvien https://www.youtube.com/watch?v=q0_JAoaM6pU
        </p>
      </div>
    </div>
  );
};

export default PainExtras;
