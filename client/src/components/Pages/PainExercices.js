import React, { useContext } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utilities/HeadingArea";
import Exercise from "../Exercise";
import { Helmet } from "react-helmet";

const PainExercices = () => {
  const { requestedExercises, painName } = useContext(PainsContext);

  return (
    <div>
      <Helmet>
        <title>Exercices {painName} – Pvssy Talk</title>
        <meta
          name="description"
          content={`${painName}: exercices liés à la douleur `}
        />
      </Helmet>
      <HeadingArea pretitle={painName} title="Exercices" level="h1" />
      <div className="exercises-container">
        {requestedExercises &&
          requestedExercises.map((ex, index) => <Exercise exercise={ex} />)}
      </div>
    </div>
  );
};

export default PainExercices;
