import React, { useContext, useEffect } from "react";
import { PainsContext } from "../contexts/PainsContext";
import { HeadingArea } from "../utils/HeadingArea";
import { SourceList } from "../utils/SourceList";

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
      <SourceList sources={allSources} />
    </div>
  );
};

export default Suggestions;
