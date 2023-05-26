import React from "react";
import { HeadingArea } from "../../utilities/HeadingArea";
import { Link } from "react-router-dom";
import Pictocard from "../Pictocard";
import Pains from "./Pains";
import Ressources from "./Ressources";
import { TitleLink } from "../../utilities/TitleLink";

const Home = () => {
  //TODO
  console.log("%chome component run again", "color:orange");
  //FIXME button inside a link + inline CSS

  return (
    <>
      <div className="title-aside-container">
        <h2>
          Avoir mal
          <br />
          n’est pas normal
        </h2>
        <div>
          <p className="subtitle">
            Les douleurs sexuelles concernent{" "}
            <u>une personne à vulve sur cinq</u>. Elles peuvent toucher à la
            vulve, au vagin, et s’étendre au delà de l’utérus. Ces douleurs
            peuvent avoir des répercussions importantes sur différents aspects
            de sa vie, sa sexualité, ou sa santé mentale et physique.
          </p>
          <p className="subtitle">
            <u>Avoir mal n’est pas normal</u>. Encore moins lorsqu’il s’agit de
            ton plaisir et ta sexualité. N’hésite pas à t’informer et t’entourer
            de soignant·e·sx <em>safe</em> pour t’accompagner dans ton parcours
            de soin.
          </p>
        </div>
      </div>
      <div className="title-aside-container">
        <h2>Par où commencer</h2>
        <div className="ressources-container">
          <TitleLink to="introduction" title="Introduction aux douleurs" />
          <TitleLink
            to="guide-auto-observation"
            title="Guide d’auto-observation"
          />
          <TitleLink to="qui-consulter" title="Qui consulter ?" />
        </div>
      </div>
      <div className="title-aside-container">
        <h2>Mieux connaître ses douleurs</h2>
        <div>
          <p className="subtitle">
            Chaque douleur est traitée avec une approche à la fois médicale et
            sexologique pour te donner une vision complète. Tu trouveras
            également des ressources pour aller plus loin.
          </p>
        </div>
      </div>

      <Pains />
      <div className="title-aside-container">
        <h2>Ressources supplémentaires</h2>
        <div className="ressources-container">
          <TitleLink to="ressources/glossaire" title="Glossaire" />
          <TitleLink to="ressources/exercices" title="Exercices" />
          <TitleLink
            to="ressources/litterature-et-medias"
            title="Littérature et médias"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
