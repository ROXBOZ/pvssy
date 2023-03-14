import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { PainsContext } from "../../contexts/PainsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faHandPeace,
} from "@fortawesome/free-solid-svg-icons";

const PainExercices = () => {
  const [showExercise, setShowExercise] = useState(false);

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

  const createList = (arr) => {
    return (
      <ul className="animate">
        {arr.map((paragraph, index) => (
          <li className="howto" key={index}>
            {paragraph}
          </li>
        ))}
      </ul>
    );
  };

  const handleClick = () => {
    setShowExercise((prev) => !prev);
  };

  return (
    <div>
      <div className="heading-area">
        <p className="pretitle">Exercices</p>
        <h1>{painName}</h1>
        <p className="subtitle">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
          recusandae sit sapiente, assumenda aperiam autem natus atque ratione
          sequi veritatis rerum beatae voluptate amet eveniet deleniti inventore
          soluta! Dolore, delectus.
        </p>
        <div className="exercises-container">
          {requestedExercises &&
            requestedExercises.map((ex, index) => (
              <div className="exercise" key={index}>
                <h3 className="h2">{ex.title}</h3>
                <strong>
                  <ul>
                    <li className="goals">
                      <FontAwesomeIcon
                        icon={faCircleQuestion}
                        className="icon"
                      />
                      {ex.goal}
                    </li>

                    <li className="goals">
                      <FontAwesomeIcon icon={faHandPeace} className="icon" />
                      {ex.intro}
                    </li>
                    <button onClick={handleClick}>en savoir plus</button>
                  </ul>
                </strong>
                {showExercise && (
                  <div>
                    {createList(ex.howto)}
                    <p className="animate">{ex.conclusion}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PainExercices;
