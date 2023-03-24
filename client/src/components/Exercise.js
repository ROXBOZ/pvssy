import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
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
              <span className="counter">#&thinsp;{index + 1}</span> 
              {step.stepTitle}
            </h3>
            <button className="icon-button" onClick={() => showOneStep(index)}>
              <FontAwesomeIcon
                id="chevron-icon"
                className={showStep[index] ? "open" : "close"}
                icon={faChevronDown}
              />
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
        <div className="exercise-text">
          <h2 className="h3">{exercise.title}</h2>
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "fermer" : "consulter"}
          </button>
        </div>
      </div>

      <div>
        {showDetails && (
          <div className="exercise-open">
            <div className="exercise-article">
              <div className="prealable">
                {createParagraph(exercise.prealable)}
                <div>
                  <span> Cet exercice est utile en cas de</span>
                  <br />
                  <span>{exercise.relatedPain}</span>
                </div>
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
