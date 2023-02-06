import React from "react";
import { Link } from "react-router-dom";
const douleur = () => {
  const title = "Dyspareunie";
  const ressourcesLink = `Ressources ${title}`;
  const annuaireLink = `Annuaire ${title}`;
  const article = (
    <>
      <p className="red">
        RESSOURCES ET ANNUAIRE INCORPORÉS EN BAS DE PAGE INSTEAD
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque possimus
        voluptatem tempore, nihil corrupti, sequi quos cupiditate ea praesentium
        odit eos ipsam ullam tempora soluta? Et necessitatibus nam praesentium
        ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
        possimus voluptatem tempore, nihil corrupti, sequi quos cupiditate ea
        praesentium odit eos ipsam ullam tempora soluta? Et necessitatibus nam
        praesentium ipsum Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque possimus voluptatem tempore, nihil corrupti, sequi quos
        cupiditate ea praesentium odit eos ipsam ullam tempora soluta? Et
        necessitatibus nam praesentium ipsum. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Atque possimus voluptatem tempore, nihil
        corrupti, sequi quos cupiditate ea praesentium odit eos ipsam ullam
        tempora soluta? Et necessitatibus nam praesentium ipsum. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Atque possimus voluptatem
        tempore, nihil corrupti, sequi quos cupiditate ea praesentium odit eos
        ipsam ullam tempora soluta? Et necessitatibus nam praesentium ipsum.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque possimus
        voluptatem tempore, nihil corrupti, sequi quos cupiditate ea praesentium
        odit eos ipsam ullam tempora soluta? Et necessitatibus nam praesentium
        ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
        possimus voluptatem tempore, nihil corrupti, sequi quos cupiditate ea
        praesentium odit eos ipsam ullam tempora soluta? Et necessitatibus nam
        praesentium ipsum Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Atque possimus voluptatem tempore, nihil corrupti, sequi quos
        cupiditate ea praesentium odit eos ipsam ullam tempora soluta? Et
        necessitatibus nam praesentium ipsum. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Atque possimus voluptatem tempore, nihil
        corrupti, sequi quos cupiditate ea praesentium odit eos ipsam ullam
        tempora soluta? Et necessitatibus nam praesentium ipsum. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Atque possimus voluptatem
        tempore, nihil corrupti, sequi quos cupiditate ea praesentium odit eos
        ipsam ullam tempora soluta? Et necessitatibus nam praesentium ipsum.
      </p>
    </>
  );
  return (
    <>
      <div>
        <h1>{title}</h1>
        <ul className="category-submenu">
          <li>
            <Link to="/">{ressourcesLink}</Link>
          </li>
          <li>
            <Link to="/">{annuaireLink}</Link>
          </li>
        </ul>
      </div>
      <div className="col-left">
        <div className="img-holder"></div>
      </div>

      <div className="col-right">{article}</div>
    </>
  );
};

export default douleur;
