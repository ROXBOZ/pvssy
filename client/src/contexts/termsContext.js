import { createContext, useState } from "react";

export const TermsContext = createContext();
export const TermsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const url = "http://localhost:5000/api/terms/all";
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result.allTerms);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Catch", error);
      setError(error);
    }
  };

  return (
    <TermsContext.Provider
      value={{
        Loading,
        Error,
        data,
        url,
        fetchData,
      }}
    >
      {props.children}
    </TermsContext.Provider>
  );
};
