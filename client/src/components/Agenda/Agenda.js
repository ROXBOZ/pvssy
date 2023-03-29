import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { EventsContext } from "../../contexts/eventsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { HeadingArea } from "../../utils/HeadingArea";
import EventCard from "./EventCard.js";
import { dateConverter, dateTimeConverter } from "../../utils/dateConverter";
import { generateColor } from "../../utils/colorGenerator";

const Agenda = () => {
  const color1 = "#f5733c";
  const color2 = "#ff50d7";
  // const const [showEvent, setShowEvent] = useState(second)
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

  useEffect(() => {
    fetchData(agendaURL);
  }, [agendaURL]);

  // const handleClick = () => {

  // }

  return (
    <div>
      <dig className="grid-area">
        <p className="centered">
          Vous avez un évènement à proposer ?{" "}
          <Link to="/login">Connectez-vous</Link>.
        </p>

        <div className="centered filter-dashboard">
          <div className="filter">
            <div className="filter-dropdown">
              <div className="input-icon">
                <label htmlFor="region">Région</label>
                <input
                  className="line"
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
      </dig>
      <div>
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
                  <p className="pretitle">
                    {e.isOnline ? <span>ONLINE</span> : <span>{e.city}</span>} |{" "}
                    <nobr>{dateConverter(e.date)}</nobr>
                  </p>

                  <div className="agenda-entry-title">
                    <h3>{e.title}</h3>
                  </div>
                  <div className="flex-center">
                    <span>{e.shortDef}</span>
                    <button>en savoir +</button>
                  </div>
                </div>
              );
            })
        ) : (
          <p className="no-suggestions">
            Il n'y a aucun événement à venir dans cette région.
          </p>
        )}
      </div>

      {/* <div className="card-grid">
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
            .map((e) => {
              return <EventCard key={e._id} e={e} />;
            })
        ) : (
          <p className="no-suggestions">
            Il n'y a aucun événement à venir dans cette région.
          </p>
        )}
        {Error && <p>Erreur</p>}
      </div> */}
    </div>
  );
};

export default Agenda;
