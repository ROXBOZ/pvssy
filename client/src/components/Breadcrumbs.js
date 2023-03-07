import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  let currentLink = "";

  if (
    location.pathname === "/" ||
    (location.state && location.state.notFound)
  ) {
    return null;
  }

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, arr) => {
      currentLink += `/${crumb}`;
      const isLastCrumb = index === arr.length - 1;

      return (
        <div className="crumb" key={crumb}>
          {isLastCrumb ? (
            <span>
              {crumb
                // TOD0 batch this
                .replaceAll("%C3%A9", "é")
                .replaceAll("%20", " ")
                .replaceAll("%C3%A8", "è")
                .replaceAll("%C3%A0", "à")
                .replaceAll("-", " ")}
            </span>
          ) : (
            <Link to={currentLink}>
              {crumb
                // T0D0 batch this
                .replaceAll("%C3%A9", "é")
                .replaceAll("%20", " ")
                .replaceAll("%C3%A8", "è")
                .replaceAll("%C3%A0", "à")
                .replaceAll("-", " ")}
            </Link>
          )}
        </div>
      );
    });

  return <div className="breadcrumbs">{crumbs}</div>;
}
