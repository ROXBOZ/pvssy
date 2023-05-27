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
    ? allSources.filter((p) => p.category.toLowerCase().includes(selectedTag))
    : allSources;

  useEffect(() => {
    fetchAllSources();
  }, []);

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
      </Helmet>
      <div className="title-aside-container">
        <h1>Littérature et médias</h1>
        <div>
          <p className="subtitle">
            Des livres, des articles, des podcasts et des vidéos recommandés par{" "}
            <span className="logo">Pvssy Talk</span> pour t’informer davantage
            sur tes douleurs.
          </p>
        </div>
      </div>
      <CreateTags tags={medias} />
      <SourceList sources={filteredData} />
    </div>
  );
};

export default Medias;
