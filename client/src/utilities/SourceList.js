import { Link } from "react-router-dom";

export const SourceList = ({ sources }) => {
  const categories = ["livre", "bande dessinée", "article", "podcast", "vidéo"];

  return (
    <div>
      {categories.map((category) => {
        const categorySources = sources.filter(
          (s) => s.category.toLowerCase() === category
        );

        if (categorySources.length > 0) {
          return (
            <div key={category} className="title-aside-container">
              <h2>{category}</h2>
              <div className="additional-ressources">
                {categorySources.map((s, index) => (
                  <p className="source-list-item" key={s._id} id={index}>
                    <span className="source-author">{s.author} </span>
                    {s.year && (
                      <span className="source-year"> ({s.year}). </span>
                    )}
                    {s.url ? (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={s.url}
                      >
                        <span className="source-title">{s.title}</span>
                        <span className="screen-reader-text">
                          (ouvre un nouvel onglet)
                        </span>
                      </Link>
                    ) : (
                      <span className="source-title">{s.title}</span>
                    )}
                    <span className="source-category"> [{s.category}]</span>{" "}
                    {s.editor && (
                      <nobr>
                        <span className="source-editor">{s.editor}.</span>
                      </nobr>
                    )}
                  </p>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
