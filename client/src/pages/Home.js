import React from "react";
import Pains from "../components/Pains/Pains";
import Agenda from "../components/Agenda";
import { HeadingArea } from "../utils/HeadingArea";

const Home = () => {
  console.log("%chome component run again", "color:orange");
  //NOTE grid-area centered is not well thought...
  return (
    <>
      <HeadingArea title="Avoir mal n’est pas normal" level="h2" />
      <div className="grid-area">
        <div className="centered">
          <p>
            Les douleurs sexuelles concernent{" "}
            <u>une personne à vulve sur cinq</u>. Elles peuvent toucher à la
            vulve, au vagin, et s’étendre au delà de l’utérus. Ces douleurs
            peuvent avoir des répercussions importantes sur différents aspects
            de sa vie, sa sexualité, ou sa santé mentale et physique.{" "}
            <u>Avoir mal n’est pas normal</u>. Encore moins lorsqu’il s’agit de
            ton plaisir et ta sexualité. N’hésite pas à t’informer et t’entourer
            de soignant·e·sx <em>safe</em> pour t’accompagner dans ton parcours
            de soin.
          </p>
        </div>
      </div>
      <HeadingArea title="S’informer sur ses douleurs" level="h3" />
      <Pains />
      <HeadingArea
        title="Agenda"
        level="h2"
        subtitle="Pour proposer et participer à des évènements en ligne ou en Suisse Romande."
      />
      <Agenda />
    </>
  );
};

export default Home;
