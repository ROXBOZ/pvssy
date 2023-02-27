import React from "react";
import CountdownTimer from "../CountdownTimer";
import { Link, useLocation } from "react-router-dom";
import { fromNowToDate } from "../../utils/fromNowToDate";
import { dateTimeConverter } from "../../utils/dateConverter";

const Event = () => {
  let location = useLocation();
  const {
    title,
    isoDate,
    organizer,
    organizerWebsite,
    shortDef,
    longDef,
    isOnline,
    onlineMeeting,
    address,
    city,
    email,
    tel,
    entryFee,
  } = location.state.content;

  const { eventDateInMilli, todayStartinMilli, todayEndinMilli } =
    fromNowToDate(isoDate);

  const dateTime = dateTimeConverter(isoDate);

  const redirectToMeeting = () => {
    window.location.href = onlineMeeting;
  };

  console.log("organizer Event :", organizer);
  console.log("organizerWebsite Event :", organizerWebsite);

  return (
    <>
      <div className="heading-area">
        <h1>{title}</h1>
        <p>
          <span>
            Un évènement organisé par{" "}
            <Link
              //REVIEW
              to={`https://${organizerWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {organizer}
              <span className="screen-reader-text">ouvre un nouvel onglet</span>
            </Link>
            <br />
            {dateTime}
          </span>
          <br />
          {!isOnline && (
            <span>
              {address}, {city}
            </span>
          )}
        </p>
        <p>
          {!entryFee ? (
            <span>entrée libre</span>
          ) : (
            <span>Entrée : {entryFee} CHF</span>
          )}
        </p>

        {isOnline && (
          <p>
            <span className="button-countdown">
              <button
                disabled={
                  eventDateInMilli < todayStartinMilli ||
                  eventDateInMilli > todayEndinMilli
                    ? true
                    : false
                }
                onClick={redirectToMeeting}
              >
                Rejoindre la réunion
              </button>
              <CountdownTimer isoDate={isoDate} />
            </span>
          </p>
        )}

        <p>
          {(email || tel) && <span>Réservation : </span>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {email && tel && <span> ou </span>}
          {tel && (
            <span>
              <a href={`tel:${tel}`}>{tel}</a>
            </span>
          )}
        </p>
        <hr />
        <p className="subtitle">{shortDef}</p>
        <p>{longDef}</p>
      </div>
    </>
  );
};

export default Event;
