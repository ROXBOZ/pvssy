import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { serverURL } from "../../utilities/serverURL";

const PendingEventCard = ({ event, dateTime, getPendingEvent }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [iconClicked, setIconClicked] = useState(false);

  // REVIEW this is repeating with agenda
  const handleShowButton = () => {
    setShowDetail((prevState) => !prevState);
    toggleIconClicked();
  };
  const toggleIconClicked = () => {
    setIconClicked(!iconClicked);
  };

  // REVIEW this is repeating with the one in utils
  const getDaysFromNow = (date) => {
    let now = new Date();
    let eventDate = new Date(date);
    const diffInTime = eventDate.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
  };
  const daysFromNow = getDaysFromNow(event.dateStart);

  const approveEvent = async (eventId) => {
    const urlencoded = new URLSearchParams();
    const requestOptions = {
      method: "PUT",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${serverURL}/api/events/byId/${eventId}`,
        requestOptions
      );
      const result = await response.json();
      getPendingEvent();
    } catch (error) {
      console.log("error :", error);
    }
  };
  const declineEvent = async (eventId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("_id", eventId);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${serverURL}/api/events/all`,
        requestOptions
      );
      const result = await response.json();
      getPendingEvent();
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div className="pending-event-card" onClick={handleShowButton}>
      <div className="collapsed flex-center">
        <p>
          <strong>{event.title}</strong>{" "}
          <span className={daysFromNow < 3 && "msg warning bordered"}>
            (J-{daysFromNow})
          </span>{" "}
          par {event.organizer}
        </p>
        <FontAwesomeIcon
          id="chevron-icon"
          className={iconClicked ? "open" : "close"}
          icon={faChevronDown}
        />
      </div>

      <div className="pending-event-detail">
        {showDetail && showDetail === true && (
          <div className="pending-event-detail-content">
            <br />
            <p>
              {dateTime}, par{" "}
              <Link
                to={`https://${event.organizerWebsite}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {event.organizer}
                <span className="screen-reader-text">
                  ouvre un nouvel onglet
                </span>
              </Link>
            </p>

            {event.isOnline === true ? (
              <div>
                <p>
                  <span>Évènement online</span>
                  <br />
                  <Link to={event.onlineMeeting}>Lien vers la réunion</Link>
                </p>
              </div>
            ) : (
              <div>
                <p>
                  <span>{event.address}</span>
                  <br />
                  <span>{event.city}</span>
                  <br />
                  <span>{event.region}</span>
                </p>
              </div>
            )}
            <p>En bref: {event.shortDef}</p>
            <p>En détails: {event.longDef}</p>

            <p>
              Téléphone: {event.tel ? event.tel : <span>N/A</span>} <br />
              Adresse Email:{" "}
              {event.email ? (
                <a href={`mailto:${event.email}`}>{event.email}</a>
              ) : (
                <span>N/A</span>
              )}
            </p>
            <div className="flex-center">
              <button onClick={() => approveEvent(event._id)}>approuver</button>
              <button onClick={() => declineEvent(event._id)}>supprimer</button>

              <a href={`mailto:${event.organizerContact}`}>
                Contacter l’organisateur·ice
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingEventCard;
