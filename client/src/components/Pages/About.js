import React from "react";
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
      </Helmet>
      <div className="title-aside-container">
        <h1>À propos</h1>

        <div>
          <p className="subtitle">
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
            et{" "}
            <Link
              to="https://www.instagram.com/medsexplain/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MedSexplain (AEMG)
            </Link>
            .
          </p>

          <p>
            <span className="logo">pvssy talk</span> est actuellement en version
            beta. Notre objectif est de l’améliorer progressivement et avec des
            informations bienveillantes en fonction des besoins des
            utilisateurices.
          </p>
        </div>
      </div>
      <div className="title-aside-container">
        <h2>Équipe</h2>
        <div>
          {" "}
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
              to="https://www.sexopraxis.ch/fiona-bourdon"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fiona Bourdon (Sexopraxis)
            </Link>
            , rédaction du contenu sexologique
            <br />
            <Link
              to="https://www.sexopraxis.ch/romy-siegrist"
              target="_blank"
              rel="noopener noreferrer"
            >
              Romy Siegrist (Sexopraxis)
            </Link>
            , rédaction du contenu sexologique
            <br />
            <Link
              to="https://www.instagram.com/medsexplain/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MedSexplain (AEMG)
            </Link>
            , rédaction du contenu médical
            <br />
            <Link
              to="https://www.roxanne-borloz.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              Roxanne Borloz
            </Link>
            , développement web
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
        </div>
      </div>
      <div className="title-aside-container">
        <h2>Partenaires</h2>
        <div>
          <div className="logo-partner-container">
            <LogoPartner name="Loterie Romande" url="https://www.loro.ch/fr" />
            <LogoPartner
              name="Pulse Incubateur HES"
              url="https://pulse-hesge.ch/"
            />
            <LogoPartner
              name="MedSexPlain"
              url="https://aemg-ge.com/medsexplain/"
            />
            <LogoPartner name="Softweb" url="https://www.yoursoftweb.org/" />
            <LogoPartner name="SexoPraxis" url="https://www.sexopraxis.ch/" />
            <LogoPartner
              name="Le Fesses-tival"
              url="https://lefessestival.ch/Lieu"
            />

            <LogoPartner name="Genilem" url="https://genilem.ch/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
