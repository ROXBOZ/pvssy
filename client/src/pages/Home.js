import React, { useEffect, useContext } from "react";
import { EventsContext } from "../contexts/eventsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { dateTimeConverter } from "../utils/dateConverter";
import { generateColor } from "../utils/colorGenerator";
import Agenda from "../components/Agenda/Agenda";
import Pains from "../components/Pains/Pains";
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
    <>
      <div className="grid-area">
        <div className="centered">
          <h2>Comprendre</h2>
          <p>
            <strong>
              Les douleurs sexuelles concernent une personne à vulve sur cinq.
              Elles peuvent toucher à la vulve, au vagin, et s’étendre au delà
              de l’utérus. Ces douleurs peuvent avoir des répercussions
              importantes sur différents aspects de sa vie, sa sexualité, ou sa
              santé mentale et physique. Avoir mal n’est pas normal. Encore
              moins lorsqu’il s’agit de ton plaisir et ta sexualité. N’hésite
              pas à t’informer et t’entourer de soignant·e·sx safe pour
              t’accompagner dans ton parcours de soin.
            </strong>
          </p>
        </div>
      </div>
      <Pains />
      <HeadingArea title="Agenda" level="h2" />
      <Agenda />
    </>
  );
};

export default Home;
