import React from "react";
import { Helmet } from "react-helmet";
import Author from "../../utilities/Author";

const Consultation = () => {
  return (
    <div>
      <Helmet>
        <title>Qui consulter ?</title>
        <meta
          name="description"
          content="Pour poser un diagnostic, commence par consulter un ou médecin, (généraliste ou gynécologue)."
        />
      </Helmet>
      <div className="title-aside-container">
        <h1>
          Qui consulter ?
          <img
            className="illu-animation-xl"
            src={require(`../../assets/images/consult.png`)}
            alt=""
          />
        </h1>
        <div>
          <p className="subtitle">
            Chaque personne a un seuil de douleur plus ou moins élevé avant de
            se décider à consulter ou non, <u>cela reste un choix personnel</u>.
            Mais si cette douleur impacte ta vie sexuelle, ton désir, ton
            bien-être et ta vie quotidienne, nous te conseillons de consulter
            des pros de la santé. Pour poser un diagnostic, commence par
            consulter un·e médecin, (généraliste ou gynécologue).
          </p>
          <p className="subtitle">
            Certaines personnes n’osent pas consulter par honte, parce qu’il est
            difficile de parler de son corps et de son intimité, ou parce
            qu’avoir une sexualité douloureuse est parfois vécu comme un échec.
            Le plus important est de ne pas te forcer et de t’écouter. N’hésite
            pas à t’informer sur le ou la spécialiste que tu souhaites consulter
            avant d’y aller, ou même de l’appeler directement, cela peut t’aider
            à créer un cadre safe et bienveillant pour te rassurer. Tu peux
            aussi t’y rendre avec ton ou ta partenaire, ou quelqu’un de
            confiance.
          </p>
          <p className="subtitle">
            Il se peut que tu aies déjà vécu de mauvaises expériences lors d’une
            consultation. Si tu ne te sens pas en confiance ou en sécurité avec
            le ou la soignante, si tes douleurs sont minimisées ou que tu as
            l’impression que ta parole n’est pas entendue, n’hésite pas à partir
            de la consultation ou changer de pro de la santé. Tu mérites des
            soins bienveillants.
          </p>
        </div>
      </div>

      <div className="title-aside-container">
        <h2>À quoi ça me sert?</h2>
        <div>
          <p>
            Consulter un ou une médecin te permettra de légitimer et donner un
            nom à tes douleurs. Pour cela, le ou la soignante va t’aider à
            localiser ta douleur et la définir (par exemple: la douleur est-elle
            au niveau de toute la vulve ou uniquement de l’entrée du vagin?)
            Ensuite, plusieurs diagnostics possibles seront envisagés et suivant
            la situation, il te sera demandé d’effectuer des examens
            complémentaires avant de poser le diagnostic. Une fois qu’il est
            posé, un traitement adapté te sera prescrit.
          </p>
          <p>
            <strong>
              Important : évite l’auto-médication et privilégie une consultation
              tant que le diagnostic n’a pas été posé.
            </strong>
          </p>
        </div>
      </div>
      <div className="title-aside-container">
        <h2>Qui consulter?</h2>
        <div>
          {" "}
          <p>
            Les pros de la santé que tu choisiras dépendront de ta situation et
            surtout de tes symptômes.
          </p>
          <ul className="breathing">
            <li>
              Les médecins (comme les généralistes et les gynécologues) posent
              le diagnostic et prescrivent un traitement pour diminuer ou
              éliminer les douleurs
            </li>
            <li>
              Les psychologues travaillent sur ton ressenti par rapport aux
              douleurs, et selon la situation, peuvent t’aider à en comprendre
              les causes
            </li>
            <li>
              Les sexologues travaillent sur ton rapport à ton corps,
              l’intimité, ton plaisir et ton bien-être sexuel
            </li>
            <li>
              Les kinésithérapeutes, physiothérapeutes ou ostéopathes t’aident à
              diminuer les douleurs
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
