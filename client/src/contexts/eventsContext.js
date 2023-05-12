import { createContext, useState } from "react";
import { serverURL } from "../utilities/serverURL";
export const EventsContext = createContext();
export const EventsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const baseURL = `${serverURL}/api/events`;
  const allEventURL = `${baseURL}/all`;
  const agendaURL = `${baseURL}/upcoming`;
  const archivesURL = `${baseURL}/archived`;
  //NOTE either get rid of the loading state from the AUTH , or of the one from here, and import the Loading from AuthContext
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [iconClicked, setIconClicked] = useState(false);

  const regions = ["Genève", "Vaud", "Neuchâtel", "Jura", "Fribourg", "Valais"];

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
    <EventsContext.Provider
      value={{
        fetchData,
        Loading,
        Error,
        data,
        regions,
        baseURL,
        allEventURL,
        archivesURL,
        agendaURL,
        value,
        setValue,
        suggestions,
        setSuggestions,
        showSuggestions,
        setShowSuggestions,
        selectedSuggestionIndex,
        setSelectedSuggestionIndex,
        iconClicked,
        setIconClicked,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
