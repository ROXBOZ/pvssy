//refactored 04.05.2023
import React from "react";
import { HeadingArea } from "../../utilities/HeadingArea";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>À propos de Pvssy Talk</title>
        <meta
          name="description"
          content="Pvssy Talk est un projet porté par l'association No Dolor qui a pour but d’informer sur la sexualité et les douleurs sexuelles"
        />
        <meta
          name="keywords"
          content="Association No Dolor, Anne-Soorya Takoordyal, Roxanne Borloz, Noémie Creux, Isaline Rogg, Sexopraxis, Medsexplain"
        />
      </Helmet>
      <HeadingArea title="À propos" level="h1" />
      <div className="grid-area">
        <div className="centered">
          <p>
            <span className="logo">pvssy talk</span> est porté par l’association
            à but non lucratif <u>No Dolor</u> qui a pour but d’informer sur la
            sexualité et les douleurs sexuelles. C’est grâce à une équipe
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
