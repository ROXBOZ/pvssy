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
          requestedExercises.map((ex, index) => (
            <Exercise exercise={ex} />
            // <div key={index}>
            //   <div className="exercise">
            //     <div className="exercise-closed">
            //       <div className="exercise-text">
            //         <h2 className="h3">{ex.title}</h2>
            //         <button onClick={() => showMore(index)}>
            //           {showExercise[index] ? "fermer" : "consulter"}
            //         </button>
            //       </div>
            //     </div>

            //     <div>
            //       {showExercise[index] && (
            //         <div className="exercise-open">
            //           <div className="exercise-article">
            //             <div className="prealable">
            //               {createParagraph(ex.prealable)}
            //               <div>
            //                 <span> Cet exercice est utile en cas de</span>
            //                 <br />
            //                 <span>{ex.relatedPain}</span>
            //               </div>
            //             </div>
            //             <div className="instructions">
            //               {ex.img && (
            //                 <img
            //                   className="exercise-img"
            //                   src={ex.img}
            //                   alt={ex.title}
            //                 />
            //               )}

            //               <div>{displayInstructions(ex.howto)}</div>
            //             </div>
            //           </div>
            //         </div>
            //       )}
            //     </div>
            //   </div>
            // </div>
          ))}
      </div>
    </div>
  );
};

export default PainExercices;
