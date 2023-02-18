import React from "react";
import { useLocation } from "react-router-dom";

const Tutos = () => {
  let location = useLocation();
  const { name } = location.state ? location.state : {};
  return (
    <div>
      <h3>Tutos {name}</h3>
      <p>
        filtre : toggle entre santé et plaisir. Si santé : option choix douleurs
      </p>
    </div>
  );
};

export default Tutos;
