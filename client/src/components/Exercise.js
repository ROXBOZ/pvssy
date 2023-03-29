import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { createParagraph } from "../utils/createParagraphs";

const Exercise = ({ exercise }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showStep, setShowStep] = useState({});

  const displayInstructions = (arr) => {
    return arr.map((step, index) => {
      return (
        <div className="instructions-step" key={index}>
          <div className="instructions-step-closed">
            <h3 className="h4">
              <span className="counter">&thinsp;{index + 1}   </span> 
              {step.stepTitle}
            </h3>
            <button className="square" onClick={() => showOneStep(index)}>
              {showStep[index] ? (
                <FontAwesomeIcon icon={faMinus} />
              ) : (
                <FontAwesomeIcon icon={faPlus} />
              )}
            </button>
          </div>
          {showStep[index] && (
            <>
              {step.stepInstructions.map((instruction, index) => {
                return (
                  <p className="instructions-step-open" key={index}>
                    {instruction}
                  </p>
                );
              })}
            </>
          )}
        </div>
      );
    });
  };

  const showOneStep = (index) => {
    setShowStep((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="exercise">
      <div className="exercise-closed">
        <h2 className="h3">{exercise.title}</h2>
        {showDetails ? <p>par Fiona Bourdon</p> : <p>{exercise.intro}</p>}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "fermer" : "en savoir +"}
        </button>
      </div>

      <div>
        {showDetails && (
          <div className="exercise-open">
            <div className="exercise-article">
              <div className="prealable">
                {createParagraph(exercise.prealable)}
                <div>par Fiona Bourdon</div>
              </div>
              <div className="instructions">
                {exercise.img && (
                  <img
                    className="exercise-img"
                    src={exercise.img}
                    alt={exercise.title}
                  />
                )}
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
