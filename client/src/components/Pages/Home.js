//refactored 04.05.2023
import React from "react";
import { HeadingArea } from "../../utilities/HeadingArea";
import { Link } from "react-router-dom";

const Home = () => {
  //TODO
  console.log("%chome component run again", "color:orange");
  //FIXME  if we keep the big button, improve SCSS

  return (
    <>
      <HeadingArea title="Avoir mal n’est pas normal" />
      <div className="grid-area">
        <div className="centered">
          <p>
            Les douleurs sexuelles concernent <u>1 personne à vulve sur 5</u>.
            Elles peuvent toucher à la vulve, au vagin, et s’étendre au delà de
            l’utérus. Ces douleurs peuvent avoir des répercussions importantes
            sur différents aspects de sa vie, sa sexualité, ou sa santé mentale
            et physique.
          </p>
          <p>
            <u>Avoir mal n’est pas normal</u>. Encore moins lorsqu’il s’agit de
            ton plaisir et ta sexualité. N’hésite pas à t’informer et t’entourer
            de soignant·e·sx <em>safe</em> pour t’accompagner dans ton parcours
            de soin.
          </p>
        </div>
        <div className="centered">
          <Link to="/s-informer" style={{ border: "none" }}>
            <button style={{ fontSize: "large" }}>Je m’informe</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
