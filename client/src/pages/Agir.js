import React from "react";
import { Link } from "react-router-dom";
import Consulter from "../components/Consulter";
import Evaluer from "../components/Evaluer";

const Agir = () => {
  return (
    <div>
      <h1>Comprendre &&nbsp;agir</h1>
      <p className="red">
        QUELLE TYPE DE MISE EN PAGE ? CONSULTER et S'AUTO-EXAMINER peuvent-être
        des blocs-liens redirectifs ou des composants incorporés.{" "}
      </p>
      <Consulter />
      <Evaluer />
    </div>
  );
};

export default Agir;
