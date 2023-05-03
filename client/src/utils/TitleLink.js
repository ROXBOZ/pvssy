import { Link } from "react-router-dom";

export const TitleLink = ({ to, title }) => (
  <Link to={to}>
    <h3 className="ressource">{title} </h3>
  </Link>
);
