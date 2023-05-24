import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { serverURL } from "../utilities/serverURL";

export const PainsContext = createContext();
export const PainsContextProvider = (props) => {
  let location = useLocation();
  const [data, setData] = useState([]);
  const url = `${serverURL}/api/pains/all`;
  //NOTE same comment as in eventsProvider
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [painData, setPainData] = useState(null);
  const [requestedSources, setRequestedSources] = useState([]);
  const [requestedTerms, setRequestedTerms] = useState([]);
  const [requestedExercises, setRequestedExercises] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [isMed, setIsMed] = useState(true);
  const segments = location.pathname.split("/");
  const index = segments.indexOf("douleurs");
  const [allExercises, setAllExercises] = useState([]);
  const [allSources, setAllSources] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  let painTags = ["vulve", "vagin", "utérus", "règles"];
  let painList = [
    "Vaginisme",
    "Endométriose",
    "Syndrome des ovaires polykystiques",
    "Lichen scléreux",
    "Vaginite et mycose",
    "Sécheresse vaginale",
    "Utérus rétroversé",
    "Vulvodynie",
  ];
  let painName =
    index !== -1 && index + 1 < segments.length
      ? decodeURIComponent(segments[index + 1])
          .charAt(0)
          .toUpperCase() + decodeURIComponent(segments[index + 1]).slice(1)
      : null;

  const fetchData = async (url, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
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

  const fetchRelatedSources = async (res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      console.log("process.env.NODE_ENV :", process.env.NODE_ENV);
      console.log("serverURL :", serverURL);
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
  const fetchAllSources = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${serverURL}/api/sources/all`,
        requestOptions
      );
      const result = await response.json();
      setAllSources(result.allSources);
    } catch (error) {
      console.log("error :", error);
    }
  };
  const fetchRelatedTerms = async (res) => {
    // res.header("Access-Control-Allow-Origin", "*");
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
  const fetchRelatedExercises = async (res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${serverURL}/api/exercises/byPain?relatedPain=${painName}`,
        requestOptions
      );
      const result = await response.json();
      setRequestedExercises(result.requestedExercises);
    } catch (error) {
      console.log("error :", error);
    }
  };
  const fetchAllExercises = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${serverURL}/api/exercises/all`,
        requestOptions
      );
      const result = await response.json();

      setAllExercises(result.allExercises);
      console.log("allExercises :", allExercises);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    //NOTE think about a way to call just the fetchfunction you want in each case.
    fetchData(url);
    fetchRelatedSources(painName);
    fetchRelatedTerms(painName);
    fetchRelatedExercises(painName);
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
        requestedExercises,
        allExercises,
        fetchAllExercises,
        fetchAllSources,
        allSources,
        selectedTag,
        setSelectedTag,
        painTags,
        painList,
      }}
    >
      {props.children}
    </PainsContext.Provider>
  );
};
