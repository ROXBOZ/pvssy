import React from "react";
import Pains from "./Pains";
import Ressources from "./Ressources";
import { HeadingArea } from "../../utilities/HeadingArea";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Pictocard from "../Pictocard";

const Sinformer = () => {
  return (
    <div>
      <Helmet>
        <title>S'informer sur ses douleurs sexuelles – Pvssy Talk</title>
        <meta
          name="description"
          content="Pvssy Talk offre des de l'information, des pistes et des ressources pour gérer tes douleurs sexuelles."
        />
      </Helmet>
      <HeadingArea title="S’informer" level="h1" />
      <HeadingArea
        title="(Re)découvrir ton corps"
        level="h2"
        subtitle="Des pistes pour bien observer ton corps, l’écouter, et mieux localiser tes douleurs."
      />

      {/* <div className="grid-area">
        <Pictocard article={"introduction"} />
        <Pictocard article={"auto-observation"} />
        <Pictocard article={"consulter"} />
      </div> */}

      <HeadingArea
        title="S’informer sur ses douleurs"
        subtitle="Chaque douleur est traitée avec une approche à la fois médicale et sexologique pour te donner une vision complète. Tu trouveras également des ressources pour aller plus loin.
      "
        level="h2"
      />
      <Pains />
      <Ressources />
    </div>
  );
};

export default Sinformer;
