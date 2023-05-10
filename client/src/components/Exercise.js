import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { createParagraph } from "../utilities/createParagraphs";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Exercise = ({ exercise, isExerciseOpen, handleExerciseToggle }) => {
  const [openStepId, setOpenStepId] = useState(null);

  const handleStepToggle = (id) => {
    setOpenStepId((prevId) => (prevId === id ? null : id));
  };

  const isStepOpen = (id) => {
    return openStepId === id;
  };

  const displayInstructions = (arr) => {
    return arr.map((step, index) => {
      const stepId = `step-${index}`;

      return (
        <div className="instructions-step" key={stepId}>
          <div className="instructions-step-closed">
            <h3 className="h4">
              <span className="counter">&thinsp;{index + 1}   </span>
              {step.stepTitle}
            </h3>
            <button
              aria-label="ouvrir ou fermer les instructions"
              className="square"
              onClick={() => handleStepToggle(stepId)}
            >
              {isStepOpen(stepId) ? (
                <FontAwesomeIcon icon={faMinus} />
              ) : (
                <FontAwesomeIcon icon={faPlus} />
              )}
            </button>
          </div>
          {isStepOpen(stepId) && (
            <>
              {step.stepInstructions.map((instruction, index) => {
                return (
                  <p className="instructions-step-open" key={index}>
                    <ReactMarkdown>{instruction}</ReactMarkdown>
                  </p>
                );
              })}
            </>
          )}
        </div>
      );
    });
  };

  return (
    <div className="exercise">
      <div className="exercise-closed">
        <h2 className="h3">{exercise.title}</h2>
        {isExerciseOpen ? <></> : <p>{exercise.intro}</p>}
        <button onClick={() => handleExerciseToggle(exercise._id)}>
          {isExerciseOpen ? "fermer" : "en savoir +"}
        </button>
      </div>

      <div>
        {isExerciseOpen && (
          <div className="exercise-open">
            <div className="exercise-article">
              <div className="prealable">
                {createParagraph(exercise.prealable)}
              </div>
              <div className="instructions">
                <div>{displayInstructions(exercise.howto)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercise;
