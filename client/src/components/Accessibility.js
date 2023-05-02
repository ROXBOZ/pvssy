import React from "react";
import { HeadingArea } from "../utils/HeadingArea";

const Accessibility = () => {
  return (
    <>
      <HeadingArea level="h1" title="Accessibilité" />
      <div className="grid-area">
        <div className="centered">
          <p>
            Notre plateforme met l’accent sur l’accessibilité du web, dont elle
            fait une valeur fondamentale. Nous l’avons donc conçue de manière à
            ce qu'elle soit conviviale pour toustes, quelles que soient leurs
            capacités physiques, visuelles, auditives ou cognitives.
          </p>
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
            <a href="maitlo:info@pvssy-talk.org">
              <nobr>info@pvssy-talk.org</nobr>
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Accessibility;
