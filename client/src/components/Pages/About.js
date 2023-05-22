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
            <u>Fiona Bourdon</u>, rédaction du contenu sexologique
            <br />
            <u>Romy Siegrist</u>, rédaction du contenu sexologique
            <br />
            <u>MedSexplain (AEMGE)</u>,rédaction du contenu médical
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
            <u>Isaline Rogg</u>, communication <br />
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
          <h2 className="h3">Fiona Bourdon</h2>
          <p>
            Sexologue spécialisé dans la sexologie post traumatique et est formé
            en psycho traumatologie, Fiona travaille depuis deux ans chez
            SexopraxiS. Diplomé en soins infirmiers depuis 13 ans, iel·le à
            d'abord travaillé aux urgences somatiques, puis psychiatriques et,
            avant de prendre son virage vers la sexologie, en médecine légale
            clinique, auprès des victimes de violences interpersonnelles. C'est
            à travers ce parcours jalonné par les "attaques au corps" et par son
            métier d'artiste performer que Fiona a mis le corps au centre de ces
            approches thérapeutiques. Performer sex positive, personne queer,
            soignantx depuis de nombreuses années, engagéx et ayant une vision
            inclusive de la sexothérapie Fiona a pour but de faire souffler un
            vent nouveau sur la sexologie et ses approches.
          </p>
          <h2 className="h3">Romy Siegrist</h2>
          <p>
            Psychologue FSP et sexologue. Après des formations académiques en
            Psychologie et en Lettres à l'UNIL, un CAS en sexologie à l'UNIGE,
            ainsi que plusieurs formations en sexothérapie, Romy a travaillé
            pendant plusieurs années au sein de l'Association Violence Que
            Faire. Actuellement, en plus des entretiens cliniques réalisés à
            SexopraxiS, un centre pluridisciplinaire dédié aux questions de
            sexualités et d'intimité, elle travaille comme intervenante externe
            auprès de diverses structures, et comme rédactrice auprès de
            magazines comme Femina et Générations Plus.
          </p>
          <h2 className="h3">MedSexplain (AEMGE)</h2>
          <p>
            Projet réunissant des étudiant·exs en médecine engagé·esx dans la
            vulgarisation des questions de sexualité.
          </p>
          <h2 className="h3">Anne-Soorya Takoordyal</h2>
          <h2 className="h3">Roxanne Borloz</h2>
          <p>
            Roxanne Borloz est une graphiste et développeuse web en freelance
            entre Lausanne et Berlin, spécialisée dans l'accessibilité du web.
            Elle conçoit et développe des sites web pour des projets socialement
            et culturellement orientés.
          </p>
          <h2 className="h3">Isaline Rogg</h2>
          <h2 className="h3">Noémie Creux</h2>
        </div>
      </div>
    </div>
  );
};

export default About;
