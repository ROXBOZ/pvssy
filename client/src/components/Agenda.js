import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EventsContext } from "../contexts/eventsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { dateConverter, timeConverter } from "../utils/dateConverter";
import CountdownTimer from "./CountdownTimer";
import { fromNowToDate } from "../utils/fromNowToDate";
import { HeadingArea } from "../utils/HeadingArea";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Agenda = () => {
  const [showEvent, setShowEvent] = useState({});
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithAgenda = /agenda$/.test(currentUrl);
  const [openAccordion, setOpenAccordion] = useState(null);

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

    if (openAccordion !== id) {
      setShowEvent((prevState) => ({
        ...prevState,
        [openAccordion]: false,
      }));
      setOpenAccordion(id);
    } else {
      setOpenAccordion(null);
    }
  };

  console.log("data.upcomingEvents :", data.upcomingEvents);

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
            return new Date(a.dateStart) - new Date(b.dateStart);
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
              return new Date(a.dateStart) - new Date(b.dateStart);
            })
            .map((e, index) => {
              const { eventDateInMilli, todayStartinMilli, todayEndinMilli } =
                fromNowToDate(e.dateStart);
              return (
                <div className="agenda-entry" key={index}>
                  <p className="pretitle">
                    {e.isOnline ? (
                      <span>ONLINE</span>
                    ) : (
                      <span>{e.city.replace(/\d+/g, "")}</span>
                    )}{" "}
                    · <nobr>{dateConverter(e.dateStart)}</nobr>
                  </p>

                  <div
                    onClick={() => handleClick(e._id)}
                    className="agenda-entry-title "
                  >
                    <h3>{e.title}</h3>
                    <button>
                      {showEvent[e._id] ? "fermer" : "en savoir +"}
                    </button>
                  </div>

                  {showEvent[e._id] ? <span></span> : <span>{e.shortDef}</span>}

                  {showEvent[e._id] && (
                    <>
                      <div className="event-container">
                        <div className="event-col">
                          {!e.dateEnd ? (
                            <p>{dateConverter(e.dateStart)}</p>
                          ) : (
                            <p>
                              du {dateConverter(e.dateStart)} au 
                              {dateConverter(e.dateEnd)}.
                            </p>
                          )}

                          {e.dateEnd ? (
                            <p style={{ color: "red" }}>
                              de {timeConverter(e.dateStart)} à{" "}
                              {timeConverter(e.dateEnd)}
                            </p>
                          ) : (
                            <p>dès {timeConverter(e.dateStart)}</p>
                          )}

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
                            <p>entrée : {e.entryFee} CHF</p>
                          )}
                          <p>
                            organisé par{" "}
                            {e.organizerWebsite ? (
                              <a
                                href={`http://${e.organizerWebsite}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {e.organizer}
                                <span className="screen-reader-text">
                                  ouvre un nouvel onglet
                                </span>
                              </a>
                            ) : (
                              <span>{e.organizer}</span>
                            )}
                          </p>
                          {(e.email || e.tel) && (
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
                          )}
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
                              <CountdownTimer isoDate={e.dateStart} />
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
