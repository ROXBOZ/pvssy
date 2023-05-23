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
        subtitle="Les exercices proposés ont pour but de t’aider à reconnecter avec ton
        corps et de redécouvrir ton anatomie et ton plaisir."
      />
      <div className="grid-area">
        <div className="centered">
          <p
            style={{
              paddingBottom: "2rem",
              borderBottom: "1px solid #ce96ff",
              marginBottom: "2rem",
            }}
          >
            Certains se font solo, d’autres à deux. Il n’y a pas d’enjeu de
            réussite ni de performance. L’échec n’existe pas car tout est
            possible dans l’intimité, et la pénétration et l’orgasme sont
            optionnels. Si tu trouves ça « bizarre, pas naturel » de faire ces
            exercices, c’est normal, car on ne fait jamais ça et personne ne
            nous l’apprend. Si tu as des pensées critiques, laisse-les passer et
            accorde-toi le droit d’essayer, même plusieurs fois. Dès que tu as
            mal, arrête. Reste à l’écoute de tes sensations, tes besoin, tes
            envies et tes limites.
          </p>
        </div>
      </div>
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
