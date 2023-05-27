import React, { useRef } from "react";
import Pains from "./Pains";
import { TitleLink } from "../../utilities/TitleLink";
import { motion } from "framer-motion";

const motionVariants = {
  hidden: {
    x: "-100vw",
  },

  visible: {
    x: 0,
    transition: {
      delay: 0.5,
      duration: 0.75,
      type: "spring",
      stiffness: 70,
    },
  },
};

const Home = () => {
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
        <h2>
          Mieux connaître
          <br />
          ses douleurs
        </h2>
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
        <h2>
          Ressources
          <br />
          supplémentaires
        </h2>
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
