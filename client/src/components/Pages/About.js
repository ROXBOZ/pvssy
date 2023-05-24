//refactored 04.05.2023
import React from "react";
import { HeadingArea } from "../../utilities/HeadingArea";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import LogoPartner from "../LogoPartner";

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
            <span className="logo">pvssy talk</span> est un projet porté par
            l’association No Dolor qui a pour but d’informer sur la sexualité et
            les douleurs sexuelles. Elle est à but non lucratif. C’est grâce à
            une équipe impliquée et motivée à aider les patient·esx concerné·esx
            par les douleurs que la plateforme existe aujourd’hui. Le projet est
            en collaboration avec{" "}
            <Link
              to="https://www.sexopraxis.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sexopraxis
            </Link>{" "}
            et MedSexplain (AEMG).
          </p>
          <p>
            <Link
              to="https://www.sexopraxis.ch/fiona-bourdon"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fiona Bourdon
            </Link>
            , rédaction du contenu sexologique
            <br />
            <Link
              to="https://www.sexopraxis.ch/romy-siegrist"
              target="_blank"
              rel="noopener noreferrer"
            >
              Romy Siegrist
            </Link>
            , rédaction du contenu sexologique
            <br />
            <Link
              to="https://aemg-ge.com/medsexplain/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MedSexplain (AEMG)
            </Link>
            , rédaction du contenu médical
            <br />
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
              to="https://isalinerogg.ch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Isaline Rogg
            </Link>
            , communication <br />
            <Link
              to="https://noemiecreux.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Noémie Creux
            </Link>
            , illustratrice
          </p>
          <p>
            <span className="logo">pvssy talk</span> est actuellement en version
            beta. Notre objectif est de l’améliorer progressivement et avec des
            informations bienveillantes en fonction des besoins des
            utilisateurices.
          </p>
          <p>
            <strong> Nous remercions chaleureusement nos partenaires</strong>
          </p>
          <div className="logo-partner-container">
            <LogoPartner name="Loterie Romande" url="https://www.loro.ch/fr" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
