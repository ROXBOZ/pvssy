import React, { useContext, useEffect, useState } from "react";
import Exercise from "../Exercise";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utilities/HeadingArea";
import { Helmet } from "react-helmet";
import CreateTags from "../../utilities/CreateTags";

const Exercises = () => {
  const { fetchAllExercises, allExercises } = useContext(PainsContext);
  const [openExerciseId, setOpenExerciseId] = useState(null);
  const { painList } = useContext(PainsContext);
  const { selectedTag } = useContext(PainsContext);

  const handleExerciseToggle = (id) => {
    setOpenExerciseId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    fetchAllExercises();
  }, []);

  const filteredData = selectedTag
    ? allExercises.filter((e) => e.relatedPain.includes(selectedTag))
    : allExercises;

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
      <HeadingArea
        title="Exercices"
        level="h1"
        subtitle="gnagnagna et gnagnagna"
      />
      <CreateTags tags={painList} />
      <div className="exercises-container">
        {filteredData &&
          filteredData.map((ex) => (
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
