import React, { useContext, useEffect } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import { SourceList } from "../../utilities/SourceList";
import CreateTags from "../../utilities/CreateTags";
import { Helmet } from "react-helmet";

const Medias = () => {
  const { fetchAllSources, allSources } = useContext(PainsContext);
  const { selectedTag } = useContext(PainsContext);
  const { painList } = useContext(PainsContext);

  const filteredData = selectedTag
    ? allSources.filter((e) => e.relatedPain.includes(selectedTag))
    : allSources;

  console.log("filteredData :", filteredData);

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
      <CreateTags tags={painList} />
      <SourceList sources={filteredData} />
    </div>
  );
};

export default Medias;
