import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { EventsContext } from "../contexts/eventsContext";
import EventCard from "../components/Agenda/EventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Agenda = () => {
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
    handleInputChange,
    handleSuggestionClick,
    handleIconClick,
    handleKeyDown,
  } = useContext(EventsContext);

  useEffect(() => {
    fetchData(agendaURL);
  }, [agendaURL]);

  return (
    <div>
      <div className="heading-area">
        <div className="heading">
          <p className="pretitle">Let’s connect</p>
          <h1>
            Agenda collaboratif<sup>prototype</sup>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            accusantium optio dolore dolorum suscipit ducimus neque quaerat!
            Quas rellendus laudantium, excturi iusto architecto neque natus
            adipisci, eligendi nesciunt eos odit!
          </p>
          <p>
            Vous avez un évènement à proposer ?{" "}
            <Link to="/login">Connectez-vous</Link> et soumettez-le!
          </p>
        </div>

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
                  onChange={handleInputChange}
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
      </div>

      <div className="card-grid">
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
      </div>

      <Link to="archives">Consulter les évènements passés</Link>
    </div>
  );
};

export default Agenda;
