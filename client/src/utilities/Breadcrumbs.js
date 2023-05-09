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
    .filter((crumb) => {
      return crumb !== "";
    })
    .map((crumb, index, arr) => {
      currentLink += `/${crumb}`;
      const isLastCrumb = index === arr.length - 1;

      // Replace "sopk" with "SOPK"
      const crumbText = crumb.replace(/sopk/gi, "SOPK");

      return (
        <div className="crumb" key={crumb}>
          {isLastCrumb ? (
            <span>
              <>
                {" "}
                {crumbText
                  .replaceAll("%C3%A9", "é")
                  .replaceAll("%20", " ")
                  .replaceAll("%C3%A8", "è")
                  .replaceAll("%C3%A0", "à")
                  .replaceAll("-", " ")
                  .replaceAll("%C2%A0", " ")}
              </>
            </span>
          ) : (
            <Link to={currentLink}>
              {crumbText
                .replaceAll("%C3%A9", "é")
                .replaceAll("%20", " ")
                .replaceAll("%C3%A8", "è")
                .replaceAll("%C3%A0", "à")
                .replaceAll("-", " ")
                .replaceAll("%C2%A0", " ")}
            </Link>
          )}
        </div>
      );
    });

  return <div className="breadcrumbs">{crumbs}</div>;
}
