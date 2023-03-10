import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { serverURL } from "../utils/serverURL";

export const PainsContext = createContext();
export const PainsContextProvider = (props) => {
  let location = useLocation();
  const [data, setData] = useState([]);
  const url = `${serverURL}/api/pains/all`;
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [painData, setPainData] = useState(null);
  const [requestedSources, setRequestedSources] = useState([]);
  const [requestedTerms, setRequestedTerms] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [isMed, setIsMed] = useState(true);
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
        `${serverURL}/api/pains/spec/${painName}`,
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
        `${serverURL}/api/sources/byPain?relatedPain=${painName}`,
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
        `${serverURL}/api/terms/byPain?relatedPain=${painName}`,
        requestOptions
      );
      const result = await response.json();
      const sortedTerms = result.requestedTerms
        ? result.requestedTerms.sort((a, b) => a.term.localeCompare(b.term))
        : [];
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
        isMed,
        setIsMed,
        isSticky,
        setIsSticky,
      }}
    >
      {props.children}
    </PainsContext.Provider>
  );
};
