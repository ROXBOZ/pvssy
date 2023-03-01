import { createContext, useState } from "react";
export const EventsContext = createContext();

export const EventsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const baseURL = "http://localhost:5000/api/events";
  const allEventURL = `${baseURL}/all`;
  const agendaURL = `${baseURL}/upcoming`;
  const archivesURL = `${baseURL}/archived`;
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [iconClicked, setIconClicked] = useState(false);

  const regions = [
    "Berne",
    "Fribourg",
    "Genève",
    "La Chaux-de-Fonds",
    "Lausanne",
    "Montreux",
    "Neuchâtel",
    "Nyon",
    "Sion",
    "Vevey",
    "Yverdon-les-Bains",
  ];

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

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (newValue.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIconClicked(false);
      return;
    }

    const matchingSuggestions = regions.filter((suggestion) =>
      suggestion.toLowerCase().includes(newValue.toLowerCase())
    );
    setSuggestions(matchingSuggestions);
    setShowSuggestions(matchingSuggestions.length > 0);
    setIconClicked(true);
  };
  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    setShowSuggestions(false);
    setIconClicked(false);
  };
  const toggleIconClicked = () => {
    setIconClicked(!iconClicked);
  };
  const handleIconClick = () => {
    toggleIconClicked();
    setSuggestions([...regions]);
    setShowSuggestions(showSuggestions ? false : true);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex(
        (selectedSuggestionIndex + 1) % suggestions.length
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex(
        (selectedSuggestionIndex - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      handleSuggestionClick(suggestions[selectedSuggestionIndex]);
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
        handleInputChange,
        handleSuggestionClick,
        toggleIconClicked,
        handleIconClick,
        handleKeyDown,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
