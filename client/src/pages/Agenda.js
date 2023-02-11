import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EventsContext } from "../contexts/eventsContext";
import EventCard from "../components/Agenda/EventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Agenda = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [iconClicked, setIconClicked] = useState(false);
  const { data, upComingEventEP, fetchData, Error, Loading, regions } =
    useContext(EventsContext);

  useEffect(() => {
    fetchData(upComingEventEP);
  }, [upComingEventEP]);

  // Filter per Region

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
    <>
      <div className="heading-area">
        <div className="heading">
          <p className="pretitle">Pvssy Connect</p>
          <h1>
            Agenda d'évènements collaboratif pour organiser des réunions et des
            activités blablablabla.
          </h1>
          <p>
            Tu as un évènement à publier ? <Link to="/login">Connecte-toi</Link>
          </p>
        </div>

        <div className="filter-dashboard">
          {/* <div className="filter">
            <input type="date" id="date" name="date" />
          </div> */}

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

          {/* <div className="filter">
            <input
              placeholder="Culture"
              type="text"
              id="category"
              name="category"
            />
          </div> */}
        </div>
      </div>

      <div className="card-grid">
        {data.upcomingEvents &&
        /* Filter events based on the value inputted and if event has a region or not */
        /* Check if the filtered events have a length greater than 0 */
        data.upcomingEvents
          .filter((e) => {
            return (
              value === "" ||
              (e.region && e.region.includes(value)) ||
              !e.region
            );
          })
          /* Sort the events by date */
          .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          }).length > 0 ? (
          /* Map over the filtered and sorted events */
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
        {Loading && <p>...chargement...</p>}
      </div>

      <Link to="archives" className="simple-link">
        Consulter les évènements passés
      </Link>
    </>
  );
};

export default Agenda;
