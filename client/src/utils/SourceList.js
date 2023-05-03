import { Link } from "react-router-dom";

export const SourceList = ({ sources }) => {
  return (
    <>
      <div className="additional-ressources">
        <ul>
          {sources &&
            sources.map((s, index) => {
              if (s.isFootnote === false) {
                return (
                  <li key={s._id} id={index}>
                    <span className="source-list-item">
                      <span className="source-author">{s.author}</span>
                      {s.year && (
                        <span className="source-year"> ({s.year}).</span>
                      )}{" "}
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
                      )}{" "}
                      <span className="source-category">[{s.category}]</span>{" "}
                      {s.editor && (
                        <span className="source-editor">{s.editor}.</span>
                      )}
                    </span>
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </>
  );
};
