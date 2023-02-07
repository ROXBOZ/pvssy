import { createContext, useState } from "react";

export const PainsContext = createContext();
export const PainsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const url = "http://localhost:5000/api/pains/all";
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      // console.log("result fetch all Pains", result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Catch", error);
      setError(error);
    }
  };

  return (
    <PainsContext.Provider
      value={{
        Loading,
        Error,
        data,
        url,
        fetchData,
      }}
    >
      {props.children}
    </PainsContext.Provider>
  );
};