//refactored 04.05.2023
import React from "react";
import { HeadingArea } from "../../utilities/HeadingArea";
import { Helmet } from "react-helmet";

const Accessibility = () => {
  return (
    <div>
      <Helmet>
        <title>Accessibilité – Pvssy Talk</title>
        <meta
          name="description"
          content="Pvssy Talk met l’accent sur l’accessibilité du web, dont elle fait une valeur fondamentale. Nous l’avons donc conçue de manière à ce qu'elle soit conviviale pour toustes, quelles que soient leurs capacités physiques, visuelles, auditives ou cognitives."
        />
      </Helmet>
      <div className="title-aside-container">
        <h1>Accessibilité</h1>
        <div>
          <p className="subtitle">
            Notre plateforme met l’accent sur l’accessibilité du web, dont elle
            fait une valeur fondamentale. Nous l’avons donc conçue de manière à
            ce qu'elle soit conviviale pour toustes, quelles que soient leurs
            capacités physiques, visuelles, auditives ou cognitives.
          </p>
        </div>
      </div>
      <div className="title-aside-container">
        <h2>Engagement</h2>
        <div>
          <p>
            Notre équipe a respecté les normes WCAG afin de garantir une lecture
            et une navigation aisées. En outre, nous avons veillé à ce que notre
            code soit compatible avec les technologies d’assistance telles que
            les lecteurs d’écran et les claviers alternatifs, tout en optimisant
            notre application pour les navigateurs et les appareils mobiles les
            plus répandus.
          </p>
          <p>
            Nous sommes heureuses de notre engagement en faveur de
            l’accessibilité et nous reconnaissons qu’il est toujours possible de
            l’améliorer. Si vous avez des suggestions ou des problèmes
            d’accessibilité, n’hésitez pas à nous contacter à{" "}
            <a href="mailto:hello@pvssy-talk.org">
              <nobr>hello@pvssy-talk.org</nobr>
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
