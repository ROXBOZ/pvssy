import React, { useContext, useEffect } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utils/HeadingArea";
import { SourceList } from "../../utils/SourceList";
import CreateTags from "../../utils/CreateTags";

const Medias = () => {
  const { fetchAllSources, allSources } = useContext(PainsContext);
  const { selectedTag, painList } = useContext(PainsContext);

  const medias = ["livre", "bande dessinée", "article", "podcast", "vidéo"];

  const filteredData = selectedTag
    ? allSources.filter(
        (p) => p.category.includes(selectedTag)
        // || p.relatedPain.includes(selectedTag)
      )
    : allSources;

  useEffect(() => {
    fetchAllSources();
  }, []);

  return (
    <div>
      <HeadingArea title="Littérature et médias" level="h1" />
      <CreateTags tags={medias} />
      {/* <CreateTags tags={painList} /> */}
      <SourceList sources={filteredData} />
    </div>
  );
};

export default Medias;
