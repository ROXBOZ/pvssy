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
            <Link
              to="https://www.sexopraxis.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sexopraxis
            </Link>{" "}
            et les médecin du projet{" "}
            <Link
              to="https://aemg-ge.com/medsexplain/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MedSexplain (AEMG)
            </Link>
            .
          </p>
          <p>
            <Link
              to="https://as-takoordyal.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <nobr>Anne-Soorya</nobr> Takoordyal
            </Link>
            , créatrice et cheffe de projet
            <br />
            <Link
              to="https://www.roxanne-borloz.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              Roxanne Borloz
            </Link>
            , développeuse web
            <br />
            <Link
              to="https://noemiecreux.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Noémie Creux
            </Link>
            , illustratrice
            <br />
            <u>Isaline Rogg</u>, communication
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
