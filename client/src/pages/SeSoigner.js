import React from "react";
import { Link } from "react-router-dom";
import Pains from "../components/Pains/Pains";

const SeSoigner = () => {
  return (
    <div>
      <div className="heading-area">
        <h1>Se soigner</h1>
        <p className="subtitle">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat unde
          eum animi non. Eaque, nobis vitae corrupti error aliquid nihil
          temporibus inventore necessitatibus, est cum dolorem laborum dolor,
          rerum corporis.
        </p>
      </div>

      <Pains />
      <Link to="lexique">
        Lien temporaire vers Glossaire global (en construction)
      </Link>
    </div>
  );
};

export default SeSoigner;
