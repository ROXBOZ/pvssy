import React, { useEffect, useContext } from "react";
import { EventsContext } from "../contexts/eventsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { dateTimeConverter } from "../utils/dateConverter";
import { generateColor } from "../utils/colorGenerator";
import Agenda from "../components/Agenda/Agenda";
import { HeadingArea } from "../utils/HeadingArea";

const Home = () => {
  console.log("%chome component run again", "color:orange");
  const {
    fetchData,
    Error,
    data,
    agendaURL,
    value,
    suggestions,
    showSuggestions,
    selectedSuggestionIndex,
    iconClicked,
    handleRegionInputChange,
    handleSuggestionClick,
    handleIconClick,
    handleKeyDown,
  } = useContext(EventsContext);

  //NOTE try to use useMemo() to store the lenght of data.upcomingEvents
  useEffect(() => {
    fetchData(agendaURL);
  }, [agendaURL]);

  return (
    <div className="landing-view">
      <h1 className="logo">pvssy talk</h1>
      <h2>pour une sexualité sans douleurs et sans tabous</h2>
      <Agenda />
    </div>
  );
};

export default Home;
