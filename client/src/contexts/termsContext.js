import { createContext, useState } from "react";
import { serverURL } from "../utilities/serverURL";

export const TermsContext = createContext();
export const TermsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const url = `${serverURL}/api/terms/all`;
  //NOTE same comment as with the eventsContext
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
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
        setData,
        url,
        fetchData,
      }}
    >
      {props.children}
    </TermsContext.Provider>
  );
};
