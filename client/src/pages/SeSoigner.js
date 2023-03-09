import React from "react";
import Pains from "../components/Pains/Pains";
import Ressources from "../components/Ressources";

const SeSoigner = () => {
  return (
    <div>
      <h1>Se soigner</h1>
      <p className="subtitle">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat unde
        eum animi non. Eaque, nobis vitae corrupti error aliquid nihil
        temporibus inventore necessitatibus, est cum dolorem laborum dolor,
        rerum corporis.
      </p>
      <Pains />
      <br />
      <br />
      <Ressources />
    </div>
  );
};

export default SeSoigner;
