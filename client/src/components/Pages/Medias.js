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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui rerum
            doloribus, nostrum dolor quas hic ipsa? Recusandae consequuntur,
            eius vel id est sunt corrupti aperiam doloribus quas voluptates quos
            reprehenderit.
          </p>
        </div>
      </div>
      <CreateTags tags={medias} />
      <SourceList sources={filteredData} />
    </div>
  );
};

export default Medias;
