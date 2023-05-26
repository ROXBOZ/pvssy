import { Link } from "react-router-dom";

export const TitleLink = ({ to, title }) => (
  <Link className="title-link" to={to}>
    <h3>{title}</h3>
  </Link>
);
