import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EventsContext } from "../../contexts/eventsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { dateConverter, timeConverter } from "../../utils/dateConverter";
import CountdownTimer from "../CountdownTimer";
import { fromNowToDate } from "../../utils/fromNowToDate";
import { HeadingArea } from "../../utils/HeadingArea";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Agenda = () => {
  const [showEvent, setShowEvent] = useState({});
  const location = useLocation();

  const currentUrl = location.pathname;
  const endsWithAgenda = /agenda$/.test(currentUrl);

  const redirectToMeeting = () => {
    console.log("redirect to meeting :");
  };

  const {
    fetchData,
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

  const handleClick = (id) => {
    setShowEvent((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      {endsWithAgenda && (
        <HeadingArea
          title="Agenda"
          subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores nesciunt expedita ullam fuga dolorum architecto explicabo repudiandae hic perspiciatis alias sit laboriosam assumenda esse, dolores ab dolorem, possimus nam voluptatibus."
          level="h1"
        />
      )}
      <dig className="grid-area">
        {/* <p className="centered">
          Vous avez un évènement à proposer ?{" "}
          <Link to="/login">Connectez-vous</Link>.
        </p> */}

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
              const { eventDateInMilli, todayStartinMilli, todayEndinMilli } =
                fromNowToDate(e.date);
              return (
                <div className="agenda-entry" key={index}>
                  <p className="pretitle">
                    {e.isOnline ? <span>ONLINE</span> : <span>{e.city}</span>} ·{" "}
                    <nobr>{dateConverter(e.date)}</nobr>
                  </p>

                  <div className="agenda-entry-title ">
                    <h3>{e.title}</h3>
                    <button onClick={() => handleClick(e._id)}>
                      {showEvent[e._id] ? "fermer" : "en savoir +"}
                    </button>
                  </div>

                  {showEvent[e._id] ? <span></span> : <span>{e.shortDef}</span>}

                  {showEvent[e._id] && (
                    <>
                      <div className="event-container">
                        <div className="event-col">
                          <p>{dateConverter(e.date)}</p>
                          <p>dès {timeConverter(e.date)}</p>
                          <p>
                            {e.isOnline ? (
                              <>ONLINE</>
                            ) : (
                              <>
                                {e.address}, {e.city}
                              </>
                            )}
                          </p>
                          {!e.entryFee ? (
                            <p>entrée libre</p>
                          ) : (
                            <p>Entrée : {e.entryFee} CHF</p>
                          )}
                          <p>
                            organisé par{" "}
                            <Link
                              to={`${e.DateorganizerWebsite}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {e.organizer}
                              <span className="screen-reader-text">
                                ouvre un nouvel onglet
                              </span>
                            </Link>
                          </p>

                          <p>
                            réservations : 
                            {e.email && (
                              <a href={`mailto:${e.email}`}>{e.email}</a>
                            )}
                            {e.email && e.tel && <span> ou </span>}
                            {e.tel && (
                              <nobr>
                                <a href={`tel:${e.tel}`}>{e.tel}</a>
                              </nobr>
                            )}
                          </p>
                        </div>

                        <div className="event-col">
                          <ReactMarkdown>{e.longDef}</ReactMarkdown>
                          {e.isOnline && (
                            <div className="flex-center">
                              <button
                                onClick={redirectToMeeting}
                                disabled={
                                  eventDateInMilli < todayStartinMilli ||
                                  eventDateInMilli > todayEndinMilli
                                    ? true
                                    : false
                                }
                              >
                                Rejoindre la réunion
                              </button>
                              <CountdownTimer isoDate={e.date} />
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
        ) : (
          <p className="no-suggestions">
            Il n'y a aucun événement à venir dans cette région.
          </p>
        )}
      </div>
    </div>
  );
};

export default Agenda;
