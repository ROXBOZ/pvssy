import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { EventsContext } from "../contexts/eventsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { dateConverter, timeConverter } from "../utils/dateConverter";
import CountdownTimer from "./CountdownTimer";
import { fromNowToDate } from "../utils/fromNowToDate";
import { HeadingArea } from "../utils/HeadingArea";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Agenda = () => {
  const { regions } = useContext(EventsContext);
  const [showEvent, setShowEvent] = useState({});
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithAgenda = /agenda$/.test(currentUrl);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleFilter = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  const handleReset = () => {
    setSelectedTag(null);
  };
  const redirectToMeeting = () => {
    console.log("redirect to meeting :");
  };

  const { fetchData, data, agendaURL } = useContext(EventsContext);

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

  const filteredData = selectedTag
    ? data.upcomingEvents.filter(
        (e) => e.region.includes(selectedTag) || e.isOnline === true
      )
    : data.upcomingEvents;

  return (
    <div>
      {endsWithAgenda && <HeadingArea title="Agenda" level="h1" />}
      <div className="grid-area">
        <div className="tag-container">
          {regions.map((tag, index) => {
            return (
              <span
                key={index}
                className={`tag ${selectedTag === tag ? "active" : ""}`}
                onClick={() => handleFilter(tag)}
              >
                {tag}
              </span>
            );
          })}
          <span className="reset" onClick={() => handleReset()}>
            <FontAwesomeIcon icon={faXmark} />
             réinitialiser
          </span>
        </div>
      </div>

      <div>
        {data.upcomingEvents && filteredData.length > 0 ? (
          filteredData.map((e, index) => {
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
                  <button>{showEvent[e._id] ? "fermer" : "en savoir +"}</button>
                </div>

                {showEvent[e._id] ? <span></span> : <span>{e.shortDef}</span>}

                {showEvent[e._id] && (
                  <>
                    <div className="event-container">
                      <div className="event-col">
                        {dateConverter(e.dateStart) ===
                        dateConverter(e.dateEnd) ? (
                          <>
                            <p>{dateConverter(e.dateStart)}</p>
                            <p>
                              de {timeConverter(e.dateStart)} à{" "}
                              {timeConverter(e.dateEnd)}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              Début : {dateConverter(e.dateStart)},{" "}
                              {timeConverter(e.dateStart)}
                            </p>
                            <p>
                              Fin : {dateConverter(e.dateEnd)},{" "}
                              {timeConverter(e.dateEnd)}
                            </p>
                          </>
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
          <div className="grid-area">
            <p className="no-suggestions centered">
              Il n'y a aucun événement à venir aux alentours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agenda;
