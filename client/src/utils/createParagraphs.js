import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const createParagraph = (arr) => {
  return (
    <div>
      {arr.map((paragraph, index) => (
        <div key={index}>
          <p>
            <ReactMarkdown>{paragraph}</ReactMarkdown>
          </p>
        </div>
      ))}
    </div>
  );
};
