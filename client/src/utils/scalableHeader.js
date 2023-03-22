export const ScalableHeader = ({ title, headerLevel, className = "" }) => {
  const Header = `h${headerLevel}`;
  return <Header className={className}>{title}</Header>;
};
