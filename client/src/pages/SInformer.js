import React from "react";
import Pains from "../components/Pains/Pains";
import Ressources from "./Ressources";
import { HeadingArea } from "../utils/HeadingArea";

const Sinformer = () => {
  return (
    <div>
      <HeadingArea title="S’informer" level="h1" />
      <HeadingArea pretitle="Comprendre" title="Douleurs" level="h2" />
      <div className="grid-area">
        <p className="centered">
          Les douleurs sexuelles concernent une personne à vulve sur cinq. Elles
          peuvent toucher à la vulve, au vagin, et s’étendre au delà de
          l’utérus. Ces douleurs peuvent avoir des répercussions importantes sur
          différents aspects de sa vie, sa sexualité, ou sa santé mentale et
          physique. <strong>Avoir mal n’est pas normal</strong>. Encore moins
          lorsqu’il s’agit de ton plaisir et ta sexualité. N’hésite pas à
          t’informer et t’entourer de soignant·e·sx safe pour t’accompagner dans
          ton parcours de soin.
        </p>
      </div>
      <Pains />
      <HeadingArea pretitle="Comprendre" title="Ressources" level="h2" />
      <Ressources />
    </div>
  );
};

export default Sinformer;
