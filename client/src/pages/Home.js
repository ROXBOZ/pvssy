import React, { useEffect, useContext } from "react";
import { EventsContext } from "../contexts/eventsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Pains from "../components/Pains/Pains";
import { dateTimeConverter } from "../utils/dateConverter";
import { generateColor } from "../utils/colorGenerator";

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

  const color1 = "#f5733c";
  const color2 = "#ff50d7";
  //NOTE try to use useMemo() to store the lenght of data.upcomingEvents
  useEffect(() => {
    fetchData(agendaURL);
  }, [agendaURL]);

  return (
    <div className="landing-view">
      <h1>
        Une sexualité <nobr>sans douleurs et sans tabous</nobr>
      </h1>

      <p className="subtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
        accusantium optio dolore dolorum suscipit ducimus neque quaerat! Quas
        rellendus laudantium, excturi iusto architecto neque natus adipisci,
        eligendi nesciunt eos odit!
      </p>

      <p style={{ backgroundColor: "red" }}>
        douleurs (mais sans titre, sous-titre et filtres)
      </p>

      {/* <Pains /> */}

      <div style={{ marginTop: "6rem" }}>
        <p className="pretitle">Participer</p>
        <h2>Agenda</h2>
        <div className="filter-dashboard">
          <div className="filter">
            <div className="filter-dropdown">
              <div className="input-icon">
                <label htmlFor="region">Région</label>
                <input
                  placeholder="Lausanne"
                  id="region"
                  type="text"
                  value={value}
                  onClick={handleIconClick}
                  onChange={handleRegionInputChange}
                  onKeyDown={handleKeyDown}
                />
                <FontAwesomeIcon
                  className={iconClicked ? "open" : "close"}
                  id="chevron-icon"
                  onClick={handleIconClick}
                  icon={faChevronDown}
                />
              </div>

              {showSuggestions && (
                <ul className="suggestions">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={
                        index === selectedSuggestionIndex
                          ? "suggestion-active"
                          : ""
                      }
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {data.upcomingEvents &&
        data.upcomingEvents
          .filter((e) => {
            return (
              value === "" ||
              (e.region && e.region.includes(value)) ||
              !e.region
            );
          })
          .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          }).length > 0 ? (
          data.upcomingEvents
            .filter((e) => {
              return (
                (value === "" ||
                  (e.region && e.region.includes(value)) ||
                  !e.region) &&
                !e.isPending
              );
            })
            .sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            })
            .map((e, index) => {
              return (
                <div className="agenda-entry" key={index}>
                  <p className="agenda-entry-pretitle ">
                    <nobr>{dateTimeConverter(e.date)}</nobr> -{" "}
                    {e.isOnline ? (
                      <span>ONLINE</span>
                    ) : (
                      <span>
                        <nobr>{e.address}</nobr>, <nobr>{e.city}</nobr>
                      </span>
                    )}
                  </p>
                  <span className="entry-title">
                    <div
                      style={{ backgroundColor: generateColor(color1, color2) }}
                      className="img-holder"
                    />
                    <h3>{e.title}</h3>
                  </span>
                  <p>{e.shortDef}</p>
                  <br />
                  <button>en savoir plus</button>
                </div>
              );
            })
        ) : (
          <p className="no-suggestions">
            Il n'y a aucun événement à venir dans cette région.
          </p>
        )}
        {Error && <p>Erreur</p>}
      </div>
    </div>
  );
};

export default Home;
