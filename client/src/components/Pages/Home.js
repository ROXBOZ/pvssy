import React from "react";
import { HeadingArea } from "../../utilities/HeadingArea";
import { Link } from "react-router-dom";
import Pictocard from "../Pictocard";
import Pains from "./Pains";
import Ressources from "./Ressources";

const Home = () => {
  //TODO
  console.log("%chome component run again", "color:orange");
  //FIXME button inside a link + inline CSS

  return (
    <>
      <div className="floater-container">
        <div className="floater">
          <h2>Avoir mal n’est pas normal</h2>
          <p>
            Les douleurs sexuelles concernent{" "}
            <u>une personne à vulve sur cinq</u>. Elles peuvent toucher à la
            vulve, au vagin, et s’étendre au delà de l’utérus. Ces douleurs
            peuvent avoir des répercussions importantes sur différents aspects
            de sa vie, sa sexualité, ou sa santé mentale et physique.
          </p>
          <p>
            <u>Avoir mal n’est pas normal</u>. Encore moins lorsqu’il s’agit de
            ton plaisir et ta sexualité. N’hésite pas à t’informer et t’entourer
            de soignant·e·sx <em>safe</em> pour t’accompagner dans ton parcours
            de soin.
          </p>
        </div>
        <img
          className="animation-illustration"
          src={require(`../../assets/images/floaters/floater-2.png`)}
          alt=""
        />
      </div>
      <div className="grid-area" style={{ margin: "2rem 0" }}>
        <Pictocard title="Introduction aux douleurs" article={"introduction"} />
        <Pictocard
          title="Guide d’auto-observation"
          article={"guide-auto-observation"}
        />
        <Pictocard title="Qui consulter ?" article={"qui-consulter"} />
      </div>

      <HeadingArea
        title="S’informer sur ses douleurs"
        subtitle="Chaque douleur est traitée avec une approche à la fois médicale et sexologique pour te donner une vision complète. Tu trouveras également des ressources pour aller plus loin.
      "
        level="h2"
      />

      <Pains />
      <Ressources />
    </>
  );
};

export default Home;
