import { useEffect, useState } from "react";

export const HeadingArea = ({ pretitle, title, subtitle, isMainContent }) => {
  const [isFirstUsage, setIsFirstUsage] = useState(false);

  useEffect(() => {
    const hasH1 = document.querySelector("h1");
    setIsFirstUsage(!hasH1);
  }, []);

  const TagName = isMainContent ? "h1" : isFirstUsage ? "h1" : "h2";

  return (
    <div className="heading-area">
      {pretitle && <p className="pretitle">{pretitle}</p>}
      <TagName>{title}</TagName>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
};
