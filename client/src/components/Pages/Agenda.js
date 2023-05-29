import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EventsContext } from "../../contexts/eventsContext";
import {
  dateConverter,
  dateConverterNoWeekday,
} from "../../utilities/dateConverter";
import CountdownTimer from "../../utilities/CountdownTimer";
import { fromNowToDate } from "../../utilities/fromNowToDate";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CreateTags from "../../utilities/CreateTags";
import { PainsContext } from "../../contexts/PainsContext";
import { Helmet } from "react-helmet";
import { todayISO } from "../../utilities/regexExpressions";

const Agenda = () => {
  const { regions } = useContext(EventsContext);
  const [showEvent, setShowEvent] = useState({});
  const [openAccordion, setOpenAccordion] = useState(null);
  const { selectedTag } = useContext(PainsContext);
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
    ? data.upcomingEvents && Array.isArray(data.upcomingEvents)
      ? data.upcomingEvents
          .filter((e) => e.region.includes(selectedTag) || e.isOnline === true)
          .sort(
            (a, b) => new Date(a.eventDateStart) - new Date(b.eventDateStart)
          )
      : []
    : data.upcomingEvents && Array.isArray(data.upcomingEvents)
    ? [...data.upcomingEvents].sort(
        (a, b) => new Date(a.eventDateStart) - new Date(b.eventDateStart)
      )
    : [];

  return (
    <div>
      <Helmet>
        {selectedTag ? (
          <title>Agenda ({selectedTag}) Pvssy Talk</title>
        ) : (
          <title>Agenda Pvssy Talk</title>
        )}
        <meta
          name="description"
          content="Participe à des évènements en lien avec les douleurs sexuelles en ligne ou en Suisse Romande."
        />
      </Helmet>
      <div className="title-aside-container">
        <h1>Agenda</h1>

        <div>
          <p className="subtitle">
            Des évènements autours des douleurs sexuelles en ligne ou en
            Suisse Romande.
          </p>
          <Link style={{ marginTop: "2rem", border: "none" }} to="/login">
            <button>proposer un évènement</button>
          </Link>
        </div>
      </div>

      <div className="noun">
        <CreateTags tags={regions} />
      </div>

      <div>
        {data.upcomingEvents && filteredData.length > 0 ? (
          filteredData.map((e, index) => {
            const { eventDateInMilli, todayStartinMilli, todayEndinMilli } =
              fromNowToDate(e.eventDateStart);
            return (
              <div className="agenda-entry" key={index}>
                <p className="pretitle">
                  {e.isOnline ? (
                    <span>ONLINE</span>
                  ) : (
                    <span className="noun">{e.city.replace(/\d+/g, "")}</span>
                  )}{" "}
                  · <nobr>{dateConverterNoWeekday(e.eventDateStart)}</nobr>
                  {e.eventDateStart < todayISO && (
                    <span style={{ textTransform: "capitalize" }}>
                      <strong> · C’EST MAINTENANT !</strong>
                    </span>
                  )}
                </p>
                <div
                  onClick={() => handleClick(e._id)}
                  className="agenda-entry-title "
                >
                  <h3>{e.title}</h3>
                  <button>{showEvent[e._id] ? "fermer" : "en savoir +"}</button>
                </div>
                {showEvent[e._id] ? <span></span> : <span>{e.shortDef}</span>}
                <br />
                {/* <button className="mobile-only">
                  {showEvent[e._id] ? "fermer" : "en savoir +"}
                </button> */}
                {showEvent[e._id] && (
                  <>
                    <div className="event-container">
                      <div className="event-col">
                        {e.eventIsOneDay ? (
                          <p>{dateConverter(e.eventDateStart)}</p>
                        ) : (
                          <p>
                            du {dateConverter(e.eventDateStart)} au{" "}
                            {dateConverter(e.eventDateEnd)}
                          </p>
                        )}

                        {e.isOnline ? (
                          <p>ONLINE</p>
                        ) : (
                          <p style={{ textTransform: "capitalize" }}>
                            {!e.address.trim().endsWith(" 0") && (
                              <span className="address">{e.address}, </span>
                            )}
                            <nobr>{e.city}</nobr>
                          </p>
                        )}

                        {e.isFreeEntry ? (
                          <p>entrée libre</p>
                        ) : e.admissionFeeMax ? (
                          <p>
                            {e.admissionFeeMin}-{e.admissionFeeMax} CHF
                          </p>
                        ) : (
                          <p>{e.admissionFeeMin} CHF</p>
                        )}
                        <p>
                          organisé par{" "}
                          {e.organizerWebsite ? (
                            <a
                              href={`${e.organizerWebsite}`}
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
                            <a
                              style={{ borderBottom: "none" }}
                              href={e.onlineMeeting}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button
                                disabled={
                                  eventDateInMilli < todayStartinMilli ||
                                  eventDateInMilli > todayEndinMilli
                                    ? true
                                    : false
                                }
                              >
                                Rejoindre la réunion
                              </button>
                            </a>
                            <CountdownTimer isoDate={e.eventDateStart} />
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
            <div className="centered">
              <div className="msg-box">
                <p className="msg pending">
                  Il n'y a aucun événement à venir aux alentours.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agenda;
