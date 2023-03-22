import React from "react";
import { Link } from "react-router-dom";
import Pains from "../components/Pains/Pains";
import Ressources from "./Ressources";
import { HeadingArea } from "../utils/HeadingArea";

const SeSoigner = () => {
  return (
    <div>
      <HeadingArea
        title="Se soigner"
        subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat unde
          eum animi non. Eaque, nobis vitae corrupti error aliquid nihil
          temporibus inventore necessitatibus, est cum dolorem laborum dolor,
          rerum corporis."
      />

      <p className="msg warning">ajouter exercice/article de base</p>

      <Pains />
      <Ressources />
    </div>
  );
};

export default SeSoigner;
