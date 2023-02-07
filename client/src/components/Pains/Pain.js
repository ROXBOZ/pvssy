import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Pain = () => {
  let location = useLocation();
  const { name, def } = location.state.content;
  const ressourcesLink = `Ressources ${name}`;
  const annuaireLink = `Annuaire ${name}`;

  console.log("name", name);

  return (
    <>
      <div className="title-area">
        <h1>{name}</h1>
        <ul className="category-submenu">
          <li>
            <Link to="/">{ressourcesLink}</Link>
          </li>
          <li>
            <Link to="/">{annuaireLink}</Link>
          </li>
        </ul>
      </div>
      <div className="grid-area">
        <div className="col-left">
          <div className="img-holder"></div>
        </div>
        <div className="col-right">{def}</div>
      </div>
    </>
  );
};

export default Pain;
