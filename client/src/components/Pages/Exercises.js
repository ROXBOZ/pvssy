import React, { useContext, useEffect, useState } from "react";
import Exercise from "../Exercise";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utilities/HeadingArea";
import { Helmet } from "react-helmet";

const Exercises = () => {
  const { fetchAllExercises, allExercises } = useContext(PainsContext);

  const [openExerciseId, setOpenExerciseId] = useState(null);

  const handleExerciseToggle = (id) => {
    setOpenExerciseId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    fetchAllExercises();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Exercices Pvssy Talk</title>
        <meta
          name="description"
          content="Liste d'exercices pour soulager les douleurs sexuelles."
        />
        <meta name="keywords" content="exercices, douleurs sexuelles" />
      </Helmet>
      <HeadingArea title="Exercices" level="h1" />
      <div className="exercises-container">
        {allExercises &&
          allExercises.map((ex, index) => (
            <Exercise
              handleExerciseToggle={handleExerciseToggle}
              exercise={ex}
              isExerciseOpen={openExerciseId === ex._id}
              key={ex._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Exercises;
