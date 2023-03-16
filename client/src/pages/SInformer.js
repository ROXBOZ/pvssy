import React from "react";
import { Link } from "react-router-dom";
import Annuaire from "../components/Annuaire";

const SInformer = () => {
  return (
    <div>
      <h1>S’informer</h1>
      <p className="subtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio at
        natus placeat quia accusantium officia architecto dolore pariatur
        ratione labore similique voluptatum sapiente, expedita ab praesentium
        saepe deserunt quos consectetur.
      </p>
      {/* <Link to="lexique">
        Lien temporaire vers Glossaire global (en construction)
      </Link> */}
      <Annuaire />
    </div>
  );
};

export default SInformer;
