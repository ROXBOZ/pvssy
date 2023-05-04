import React, { useContext, useEffect } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { HeadingArea } from "../../utilities/HeadingArea";
import { SourceList } from "../../utilities/SourceList";
import CreateTags from "../../utilities/CreateTags";
import { Helmet } from "react-helmet";

const Medias = () => {
  //NOTE - add keywords in helmet
  const { fetchAllSources, allSources } = useContext(PainsContext);
  const { selectedTag } = useContext(PainsContext);
  const medias = ["livre", "bande dessinée", "article", "podcast", "vidéo"];

  const filteredData = selectedTag
    ? allSources.filter((p) => p.category.includes(selectedTag))
    : allSources;

  useEffect(() => {
    fetchAllSources();
  }, []);
  console.log("selectedTag :", selectedTag);
  return (
    <div>
      <Helmet>
        {selectedTag ? (
          <title>Littérature et médias ({selectedTag}) – Pvssy Talk</title>
        ) : (
          <title>Littérature et médias – Pvssy Talk</title>
        )}

        <meta
          name="description"
          content="Littérature et médias recommandés par Pvssy Talk."
        />
        <meta
          name="keywords"
          content="Livres, articles, podcasts, vidéos et bandes dessinées en lien avec les douleurs sexuelles"
        />
      </Helmet>
      <HeadingArea title="Littérature et médias" level="h1" />

      <CreateTags tags={medias} />
      <SourceList sources={filteredData} />
    </div>
  );
};

export default Medias;
