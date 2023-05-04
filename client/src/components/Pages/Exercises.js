import React, { useContext, useEffect } from "react";
import Exercise from "../Exercise";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utils/HeadingArea";

const Exercises = () => {
  const { fetchAllExercises, allExercises } = useContext(PainsContext);

  useEffect(() => {
    fetchAllExercises();
  }, []);

  return (
    <div>
      <HeadingArea title="Exercices" level="h1" />
      <div className="exercises-container">
        {allExercises &&
          allExercises.map((ex, index) => <Exercise exercise={ex} />)}
      </div>
    </div>
  );
};

export default Exercises;
