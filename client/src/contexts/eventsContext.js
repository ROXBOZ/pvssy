import { createContext, useState } from "react";

export const EventsContext = createContext();
export const EventsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const url = "http://localhost:5000/api/events/all";
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result.allEvents);
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
        Loading,
        Error,
        data,
        url,
        fetchData,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
