export const TitleAside = ({ title, content, level = "h1" }) => {
  const HeadingTag = level;

  return (
    <div className="title-aside-container">
      <HeadingTag>{title}</HeadingTag>
      <div>{content}</div>
    </div>
  );
};
