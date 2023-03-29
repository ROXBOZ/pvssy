import React from "react";
import { HeadingArea } from "../utils/HeadingArea";

const About = () => {
  console.log("localStorage.getItem();", localStorage.getItem("token"));
  return (
    <div>
      <HeadingArea title="À propos" level="h1" />
      <div className="grid-area">
        <div className="centered">
          <p>
            <strong>Pvssy talk</strong> est porté par l’association à but non
            lucratif <strong>No Dolor</strong> qui a pour but d’informer sur la
            sexualité et les douleurs sexuelles. C’est grâce à une équipe
            impliquée et motivée à aider les patient·es concerné·es par les
            douleurs que la plateforme existe aujourd’hui. Les contenus ont été
            réalisés par les psycho-sexologues de <strong>Sexopraxis</strong> et
            les médecin de l’association <strong>Medsexplain</strong>.
          </p>
          <p>
            <strong>Anne-Soorya Takoordyal</strong> créatrice et cheffe de
            projet
            <br />
            <strong>Roxanne Borloz</strong> développeuse web
            <br />
            <strong>Noémie Creux</strong> illustratrice
            <br />
            <strong>Isaline Rogg</strong> communication
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
