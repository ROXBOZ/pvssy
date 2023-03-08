import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const excludedPaths = [
      /^\/profile\/(ajouter|modifier|approuver|supprimer)/,
    ];

    if (excludedPaths.some((pattern) => pattern.test(pathname))) {
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
