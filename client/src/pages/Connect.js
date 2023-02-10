import React, { useEffect, useContext, useState } from "react";
import { EventsContext } from "../contexts/eventsContext";
import EventCard from "../components/Connect/EventCard";
import { Link } from "react-router-dom";

const Connect = () => {
  const { data, upComingEventEP, fetchData, Error, Loading, regions } =
    useContext(EventsContext);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  useEffect(() => {
    fetchData(upComingEventEP);
  }, [upComingEventEP]);

  // Filter per Region

  console.log("value", value); // Input

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (newValue.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const matchingSuggestions = regions.filter((suggestion) =>
      suggestion.toLowerCase().includes(newValue.toLowerCase())
    );
    setSuggestions(matchingSuggestions);
    setShowSuggestions(matchingSuggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    setShowSuggestions(false);
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
            activités en temps réel
          </h1>
        </div>

        <div className="filter-dashboard">
          <div className="filter">
            <input type="date" id="date" name="date" />
          </div>

          <div className="filter">
            <div className="filter-dropdown">
              <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
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

          <div className="filter">
            <input
              placeholder="Culture"
              type="text"
              id="category"
              name="category"
            />
          </div>
        </div>
      </div>

      <div className="card-grid">
        {data.upcomingEvents &&
          data.upcomingEvents
            .filter((e) => {
              return value === "" || (e.region && e.region.includes(value));
            })
            .map((e) => {
              return <EventCard key={e._id} e={e} />;
            })}
        {Error && <p>Erreur</p>}
        {Loading && <p>...chargement...</p>}
      </div>

      <Link to="archives" className="simple-link">
        Consulter les évènements passés
      </Link>
    </>
  );
};

export default Connect;
