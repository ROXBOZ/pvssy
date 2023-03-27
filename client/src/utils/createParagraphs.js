import { ReactMarkdown } from "react-markdown/lib/react-markdown";
export const createParagraph = (arr) => {
  return (
    <div>
      {arr.map((paragraph, index) => (
        <div key={index}>
          <ReactMarkdown>{paragraph}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};
