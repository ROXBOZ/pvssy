import React, { useContext, useEffect } from "react";
import { PainsContext } from "../contexts/PainsContext";
import { HeadingArea } from "../utils/HeadingArea";

const Exercises = () => {
  const { fetchAllExercises, allExercises } = useContext(PainsContext);

  useEffect(() => {
    fetchAllExercises();
  }, []);

  return (
    <div>
      <HeadingArea
        pretitle="Ressources"
        title="Exercices"
        subtitle=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          temporibus optio esse possimus doloribus odit quidem accusamus
          consectetur accusantium, cumque harum sunt ipsam hic maxime
          repudiandae commodi repellendus natus eveniet!"
        level="h1"
      />

      <p className="reminder msg">ajouter tous les exercices. FILTRES?</p>

      <div>
        <ol>
          {allExercises.map((exercise) => (
            <li key={exercise.id}>{exercise.title}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Exercises;
