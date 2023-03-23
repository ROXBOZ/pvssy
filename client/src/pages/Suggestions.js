import React, { useContext, useEffect } from "react";
import { PainsContext } from "../contexts/PainsContext";
import { HeadingArea } from "../utils/HeadingArea";

const Suggestions = () => {
  const { fetchAllSources, allSources } = useContext(PainsContext);

  useEffect(() => {
    fetchAllSources();
  }, []);

  return (
    <div>
      <HeadingArea
        pretitle="Ressources"
        title="Suggestions"
        subtitle=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
          accusamus est ipsum minus voluptatem voluptas quos aperiam saepe
          molestias repudiandae! Distinctio architecto amet dolor, fuga at quod
          optio repudiandae aperiam."
        level="h1"
      />
      <div className="grid-area">
        <p className="msg warning centered">
          ajouter la liste exhaustive des suggestions. FILTRES?
        </p>

        <ol className="centered">
          {allSources.map(
            (source) =>
              source.isFootnote === false && (
                <li key={source.id}>{source.title}</li>
              )
          )}
        </ol>
      </div>
    </div>
  );
};

export default Suggestions;
