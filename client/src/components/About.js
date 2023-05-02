import React from "react";
import { HeadingArea } from "../utils/HeadingArea";
import { Link } from "react-router-dom";

const About = () => {
  console.log("localStorage.getItem();", localStorage.getItem("token")); // this means I need to get about out of auth context ?
  //NOTE grid-area centered is not well thought...

  return (
    <div>
      <HeadingArea title="À propos" level="h1" />
      <div className="grid-area">
        <div className="centered">
          <p>
            <span className="logo">pvssy talk</span> est porté par l’association
            à but non lucratif <u>No Dolor</u> qui a pour but d’informer sur la
            sexualité et les douleurs sexuelles. C’est grâce à une équipe
            impliquée et motivée à aider les patient·es concerné·es par les
            douleurs que la plateforme existe aujourd’hui. Les contenus ont été
            réalisés par les psycho-sexologues de{" "}
            <Link to="https://www.sexopraxis.ch">Sexopraxis</Link> et les
            médecin de l’association{" "}
            <Link to="https://aemg-ge.com/medsexplain/">Medsexplain</Link>.
          </p>
          <p>
            <Link to="https://as-takoordyal.com">
              <nobr>Anne-Soorya</nobr> Takoordyal
            </Link>
            , créatrice et cheffe de projet
            <br />
            <Link to="https://www.roxanne-borloz.net">Roxanne Borloz</Link>,
            développeuse web
            <br />
            <Link to="https://noemiecreux.com">Noémie Creux</Link>,
            illustratrice
            <br />
            <u>Isaline Rogg</u>, communication
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
