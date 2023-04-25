import React, { useContext } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utils/HeadingArea";
import Exercise from "../Exercise";
import { Link } from "react-router-dom";

const PainExercices = () => {
  const { requestedExercises, painName } = useContext(PainsContext);

  return (
    <div>
      <HeadingArea pretitle={painName} title="Exercices" level="h1" />
      <div className="exercises-container">
        {requestedExercises &&
          requestedExercises.map((ex, index) => <Exercise exercise={ex} />)}
      </div>
    </div>
  );
};

export default PainExercices;
