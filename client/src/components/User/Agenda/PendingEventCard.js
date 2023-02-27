import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PendingEventCard = ({ event, dateTime }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [iconClicked, setIconClicked] = useState(false);
  const handleShowButton = () => {
    setShowDetail((prevState) => !prevState);
    toggleIconClicked();
  };
  const toggleIconClicked = () => {
    setIconClicked(!iconClicked);
  };

  const approveEvent = async (eventId) => {
    const urlencoded = new URLSearchParams();
    const requestOptions = {
      method: "PUT",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/byId/${eventId}`,
        requestOptions
      );
      const result = await response.json();
      console.log("result :", result);
      window.location.reload();
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

    fetch("http://localhost:5000/api/events/all", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const getDaysFromNow = (date) => {
    let now = new Date();
    let eventDate = new Date(date);
    const diffInTime = eventDate.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
  };
  const daysFromNow = getDaysFromNow(event.date);

  return (
    <div className="pending-event-card" onClick={handleShowButton}>
      <div className="collapsed">
        <p>
          <strong>{event.title}</strong>
          &nbsp;
          <span className={daysFromNow < 3 && "msg warning"}>
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
            <div className="button-flex">
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
