import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { PainsContext } from "../contexts/PainsContext";

const CreateTags = (tags) => {
  const { selectedTag, setSelectedTag } = useContext(PainsContext);

  useEffect(() => {
    return () => {
      setSelectedTag(null);
    };
  }, [setSelectedTag]);

  const handleFilter = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  const handleReset = () => {
    setSelectedTag(null);
  };
  return (
    <div className="grid-area">
      <div className="tag-container">
        {tags.tags.map((tag, index) => {
          return (
            <span
              key={index}
              className={`tag ${selectedTag === tag ? "active" : ""} `}
              onClick={() => handleFilter(tag)}
            >
              {tag}
            </span>
          );
        })}
        <span className="reset" onClick={() => handleReset()}>
          <FontAwesomeIcon icon={faXmark} />
           tout
        </span>
      </div>
    </div>
  );
};
export default CreateTags;
