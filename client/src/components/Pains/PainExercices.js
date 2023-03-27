import React, { useContext } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utils/HeadingArea";
import Exercise from "../Exercise";

const PainExercices = () => {
  const { requestedExercises, painName } = useContext(PainsContext);

  return (
    <div>
      <HeadingArea
        pretitle={painName}
        title="Exercices"
        subtitle=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          temporibus optio esse possimus doloribus odit quidem accusamus
          consectetur accusantium, cumque harum sunt ipsam hic maxime
          repudiandae commodi repellendus natus eveniet!"
        level="h1"
      />

      <div className="exercises-container">
        {requestedExercises &&
          requestedExercises.map((ex, index) => <Exercise exercise={ex} />)}
      </div>
    </div>
  );
};

export default PainExercices;
