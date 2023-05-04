import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PainsContext } from "../contexts/PainsContext";
import { Helmet } from "react-helmet";

const CreateTags = (tags) => {
  const { selectedTag, setSelectedTag } = useContext(PainsContext);

  const handleFilter = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  const handleReset = () => {
    setSelectedTag(null);
  };
  console.log("selectedTag :", selectedTag);
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
