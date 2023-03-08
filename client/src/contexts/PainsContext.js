import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PainsContext = createContext();
export const PainsContextProvider = (props) => {
  let location = useLocation();
  const [data, setData] = useState([]);
  const url = "http://localhost:5000/api/pains/all";
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [painData, setPainData] = useState(null);
  const [requestedSources, setRequestedSources] = useState([]);
  const [requestedTerms, setRequestedTerms] = useState([]);

  const segments = location.pathname.split("/");
  const index = segments.indexOf("douleurs");

  let painName =
    index !== -1 && index + 1 < segments.length
      ? segments[index + 1].charAt(0).toUpperCase() +
        segments[index + 1].slice(1)
      : null;

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
  const fetchSinglePain = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/pains/spec/${painName}`,
        requestOptions
      );
      const result = await response.json();
      setPainData(result);
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

  const fetchRelatedTerms = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/terms/byPain?relatedPain=${painName}`,
        requestOptions
      );
      const result = await response.json();
      const sortedTerms = result.requestedTerms.sort((a, b) =>
        a.term.localeCompare(b.term)
      );
      setRequestedTerms(sortedTerms);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData(url);
    fetchRelatedSources(painName);
    fetchRelatedTerms(painName);
  }, [url, painName]);

  return (
    <PainsContext.Provider
      value={{
        Loading,
        Error,
        data,
        url,
        fetchData,
        fetchSinglePain,
        painData,
        setPainData,
        painName,
        fetchRelatedSources,
        requestedSources,
        fetchRelatedTerms,
        requestedTerms,
      }}
    >
      {props.children}
    </PainsContext.Provider>
  );
};
