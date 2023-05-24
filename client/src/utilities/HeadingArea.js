export const HeadingArea = ({
  pretitle,
  title,
  subtitle,
  level = "h2",
  color,
}) => {
  const HeadingTag = level;

  return (
    <div className="heading-area">
      {pretitle && <p className="pretitle">{pretitle}</p>}
      <HeadingTag>
        {title} {color && <span className="colored">{color}</span>}
      </HeadingTag>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
};
