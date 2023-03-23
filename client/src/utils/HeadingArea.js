export const HeadingArea = ({ pretitle, title, subtitle, level = "h2" }) => {
  const HeadingTag = level;

  return (
    <div className="heading-area">
      {pretitle && <p className="pretitle">{pretitle}</p>}
      <HeadingTag>{title}</HeadingTag>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
};
