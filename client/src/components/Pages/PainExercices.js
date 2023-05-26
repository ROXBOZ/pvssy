import React, { useContext, useState } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utilities/HeadingArea";
import Exercise from "../Exercise";
import { Helmet } from "react-helmet";

const PainExercices = () => {
  const { requestedExercises, painName } = useContext(PainsContext);
  const [openExerciseId, setOpenExerciseId] = useState(null);

  const handleExerciseToggle = (id) => {
    setOpenExerciseId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      <Helmet>
        <title>Exercices {painName} – Pvssy Talk</title>
        <meta
          name="description"
          content={`${painName}: exercices liés à la douleur `}
        />
      </Helmet>

      <h1>
        Exercices <span className="colored">{painName.toLowerCase()}</span>
      </h1>

      <div className="exercises-container">
        {requestedExercises ? (
          requestedExercises.map((ex) => (
            <Exercise
              exercise={ex}
              handleExerciseToggle={handleExerciseToggle}
              isExerciseOpen={openExerciseId === ex._id}
              key={ex._id}
            />
          ))
        ) : (
          <div className="grid-area">
            <div className="centered">
              <p className="msg warning">
                Il n’y a pas d’exercices relatifs à cette douleur pour
                l’instant.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PainExercices;
