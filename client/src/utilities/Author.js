import React from "react";
import { Link } from "react-router-dom";

const Author = ({ name, url }) => {
  return (
    <Link className="author" to={url} target="_blank" rel="noopener noreferrer">
      {name}
    </Link>
  );
};

export default Author;
