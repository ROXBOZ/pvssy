import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const PainExercices = () => {
  const [showExercise, setShowExercise] = useState({});
  const [showStep, setShowStep] = useState({});

  let location = useLocation();
  const { requestedExercises } = useContext(PainsContext);

  const painName =
    location.pathname
      .split(/\/|#/)
      .filter((item) => item !== "")
      .slice(-2, -1)[0]
      .slice(0, 1)
      .toUpperCase() +
    location.pathname
      .split(/\/|#/)
      .filter((item) => item !== "")
      .slice(-2, -1)[0]
      .slice(1);

  const createParagraph = (arr) => {
    return (
      <>
        {arr.map((paragraph, index) => (
          <div key={index}>
            <p>{paragraph}</p>
            <hr />
          </div>
        ))}
      </>
    );
  };

  const displayInstructions = (arr) => {
    return arr.map((step, index) => {
      return (
        <div className="instructions-step" key={index}>
          <div className="instructions-step-closed">
            <h3 className="h4">
              <span className="counter">#{index + 1}</span> {step.stepTitle}
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

  const showMore = (index) => {
    setShowExercise((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const showOneStep = (index) => {
    setShowStep((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div>
      <div className="heading-area">
        <p className="pretitle">Guide</p>
        <h1>Exercices {painName}</h1>
        {/* <p className="subtitle">
          Prends un rendez-vous intime pour (re)faire connaissance avec ton
          corps.
        </p> */}
        <div className="exercises-container">
          {requestedExercises &&
            requestedExercises.map((ex, index) => (
              <div key={index}>
                <div className="exercise">
                  <div className="exercise-closed">
                    <div className="exercise-text">
                      <h2>{ex.title}</h2>
                      <p className="subtitle">{ex.intro}</p>
                    </div>
                    <button onClick={() => showMore(index)}>
                      {showExercise[index] ? "fermer" : "consulter"}
                    </button>
                  </div>

                  <div>
                    {showExercise[index] && (
                      <div className="exercise-open">
                        <div className="exercise-article">
                          <div className="prealable">
                            {createParagraph(ex.prealable)}
                          </div>
                          <div className="instructions">
                            <img
                              className="exercise-img"
                              src={ex.img}
                              alt={ex.title}
                            />

                            {displayInstructions(ex.howto)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PainExercices;
