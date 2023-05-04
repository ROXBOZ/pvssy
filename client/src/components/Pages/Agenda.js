import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EventsContext } from "../../contexts/eventsContext";
import {
  dateConverter,
  dateConverterNoWeekday,
  timeConverter,
} from "../../utilities/dateConverter";
import CountdownTimer from "../../utilities/CountdownTimer";
import { fromNowToDate } from "../../utilities/fromNowToDate";
import { HeadingArea } from "../../utilities/HeadingArea";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CreateTags from "../../utilities/CreateTags";
import { PainsContext } from "../../contexts/PainsContext";
import { Helmet } from "react-helmet";

const Agenda = () => {
  const { regions } = useContext(EventsContext);
  const [showEvent, setShowEvent] = useState({});
  const location = useLocation();
  const currentUrl = location.pathname;
  const endsWithAgenda = /agenda$/.test(currentUrl);
  const [openAccordion, setOpenAccordion] = useState(null);
  const { selectedTag } = useContext(PainsContext);
  const { fetchData, data, agendaURL } = useContext(EventsContext);

  const redirectToMeeting = (url) => {
    window.open(url, "_blank");
  };

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
    <>
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
        <meta
          name="keywords"
          content="Évènements en lien avec les douleurs sexuelles en Suisse Romande, Genève, Vaud, Neuchâtel, Jura, Fribourg, Valais"
        />
      </Helmet>
      {endsWithAgenda && <HeadingArea title="Agenda" level="h1" />}
      <div className="noun">
        <CreateTags tags={regions} />
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
                    <span className="noun">{e.city.replace(/\d+/g, "")}</span>
                  )}{" "}
                  · <nobr>{dateConverterNoWeekday(e.dateStart)}</nobr>
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
                              commence le {dateConverter(e.dateStart)} à{" "}
                              {timeConverter(e.dateStart)}
                            </p>
                            <p>
                              termine le {dateConverter(e.dateEnd)} à{" "}
                              {timeConverter(e.dateEnd)}
                            </p>
                          </>
                        )}

                        <p>
                          {e.isOnline ? (
                            <>ONLINE</>
                          ) : (
                            <span style={{ textTransform: "capitalize" }}>
                              {e.address}, {e.city}
                            </span>
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
                              onClick={redirectToMeeting(e.onlineMeeting)}
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
            <div className="centered">
              <p className="msg">
                Il n'y a aucun événement à venir aux alentours.
              </p>
            </div>
          </div>
        )}
      </div>

      <Link style={{ border: "none" }} to="/login">
        <button>proposer un évènement</button>
      </Link>
    </>
  );
};

export default Agenda;
