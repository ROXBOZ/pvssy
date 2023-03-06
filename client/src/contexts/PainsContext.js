import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PainsContext = createContext();
export const PainsContextProvider = (props) => {
  let location = useLocation();

  const [data, setData] = useState([]);
  const url = "http://localhost:5000/api/pains/all";
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [requestedTerms, setRequestedTerms] = useState(null);
  const [requestedSources, setRequestedSources] = useState(null);
  const [painData, setPainData] = useState(null);

  const painName =
    location.pathname.split("/").pop().slice(0, 1).toUpperCase() +
    location.pathname.split("/").pop().slice(1);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result.allPains);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Catch", error);
      setError(error);
    }
  };
  const fetchRelatedTerms = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/terms/byPain?relatedPain=${painName}`,
        requestOptions
      );
      const result = await response.json();
      setRequestedTerms(result.requestedTerms);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchRelatedSources = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/sources/byPain?relatedPain=${painName}`,
        requestOptions
      );
      const result = await response.json();
      setRequestedSources(result.requestedSources);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return (
    <PainsContext.Provider
      value={{
        Loading,
        Error,
        data,
        url,
        fetchData,
        requestedTerms,
        requestedSources,
        painData,
        setPainData,

        fetchRelatedTerms,
        fetchRelatedSources,
      }}
    >
      {props.children}
    </PainsContext.Provider>
  );
};
