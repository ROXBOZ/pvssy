import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { createParagraph } from "../utilities/createParagraphs";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PainsContext } from "../contexts/PainsContext";

const Exercise = ({ exercise, isExerciseOpen, handleExerciseToggle }) => {
  const { painList } = useContext(PainsContext);
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

      if (arr.length === 1) {
        return (
          <>
            {step.stepInstructions.map((instruction, index) => {
              if (instruction.startsWith("http")) {
                const videoId = instruction.split("/")[3]; // Extract the YouTube video ID from the URL
                const embedUrl = `https://www.youtube.com/embed/${videoId}`; // Construct the YouTube embed URL

                return (
                  <div key={index}>
                    <iframe
                      src={embedUrl}
                      title={instruction}
                      className="video"
                      // width="560"
                      // height="315"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  </div>
                );
              } else {
                return (
                  <p className="instructions-step-open" key={index}>
                    <ReactMarkdown>{instruction}</ReactMarkdown>
                  </p>
                );
              }
            })}
            {isStepOpen(stepId) && (
              <>
                {step.stepInstructions.map((instruction, index) => {
                  if (instruction.startsWith("http")) {
                    const videoId = instruction.split("/")[3]; // Extract the YouTube video ID from the URL
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`; // Construct the YouTube embed URL

                    return (
                      <div key={index}>
                        <iframe
                          src={embedUrl}
                          title={instruction}
                          width="560"
                          height="315"
                          frameborder="0"
                          allowfullscreen
                        ></iframe>
                      </div>
                    );
                  } else {
                    return (
                      <p className="instructions-step-open" key={index}>
                        display instruction
                        {/* <ReactMarkdown>{instruction}</ReactMarkdown> */}
                      </p>
                    );
                  }
                })}
              </>
            )}
          </>
        );
      } else {
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
                  if (instruction.startsWith("http")) {
                    const videoId = instruction.split("/")[3]; // Extract the YouTube video ID from the URL
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`; // Construct the YouTube embed URL

                    return (
                      <div key={index}>
                        <iframe
                          src={embedUrl}
                          title={instruction}
                          width="560"
                          height="315"
                          frameborder="0"
                          allowfullscreen
                        ></iframe>
                      </div>
                    );
                  } else {
                    return (
                      <p className="instructions-step-open" key={index}>
                        <ReactMarkdown>{instruction}</ReactMarkdown>
                      </p>
                    );
                  }
                })}
              </>
            )}
          </div>
        );
      }
    });
  };

  return (
    <div className="exercise">
      <div className="exercise-closed">
        <div>
          <p className="pretitle">
            {exercise.relatedPain.length === painList.length
              ? "Toutes les douleurs"
              : exercise.relatedPain.join(", ")}
          </p>

          <h2 className="h3">{exercise.title}</h2>
        </div>

        <button onClick={() => handleExerciseToggle(exercise._id)}>
          {isExerciseOpen ? "fermer" : "en savoir +"}
        </button>
      </div>

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
  );
};

export default Exercise;
