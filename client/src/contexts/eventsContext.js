import { createContext, useState } from "react";
export const EventsContext = createContext();
export const EventsContextProvider = (props) => {
  const [data, setData] = useState([]);
  const baseURL = "http://localhost:5000/api/events";
  const allEventEP = `${baseURL}/all`;
  const upComingEventEP = `${baseURL}/upcoming`;
  const archivedEventEP = `${baseURL}/archived`;
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);

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
      console.log("response", response);
      const result = await response.json();
      console.log("result", result);
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Catch", error);
      setError(error);
    }
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch(baseURL);
  //     const result = await response.json();
  //     console.log("result", result);
  //   };
  //   getData();
  // }, []);

  return (
    <EventsContext.Provider
      value={{
        Loading,
        Error,
        data,
        allEventEP,
        fetchData,
        regions,
        baseURL,
        archivedEventEP,
        upComingEventEP,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
