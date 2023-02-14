import React from "react";
import CountdownTimer from "../CountdownTimer";
import { useLocation } from "react-router-dom";

const today = new Date().getDay;

const Event = () => {
  let location = useLocation();
  const {
    title,
    isoDate,
    dateTime,
    shortDef,
    longDef,
    onLine,
    meetingLink,
    adresse,
    city,
    email,
    tel,
    freeEntry,
    entryFee,
    cover,
    caption,
    credits,
  } = location.state.content;

  const redirectToMeeting = () => {
    window.location.href = meetingLink;
  };

  return (
    <>
      <div className="heading-area">
        <h1>{title}</h1>
        <p>
          {dateTime}
          <br />
          {!onLine && (
            <span>
              {adresse}, {city}
            </span>
          )}

          <p>
            {freeEntry ? (
              <span>entrée libre</span>
            ) : (
              <span>Entrée : {entryFee} CHF</span>
            )}
          </p>
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
          {onLine && (
            <span className="button-countdown">
              <button
                disabled={new Date(isoDate) !== today ? true : false}
                onClick={redirectToMeeting}
              >
                Rejoindre la réunion
              </button>
              <CountdownTimer isoDate={isoDate} />
            </span>
          )}
        </p>
      </div>
      <div className="grid-area">
        <div className="col-left">
          {cover ? (
            <>
              <img className="event-img" src={cover} alt={title} />
              <p className="event-img-text">
                <span className="event-img-caption">{caption}</span>
                {credits && (
                  <span className="event-img-credits">
                    &nbsp;©&nbsp;{credits}
                  </span>
                )}
              </p>
            </>
          ) : (
            <div className="img-holder" />
          )}
        </div>
        <div className="col-right">
          <p className="subtitle">{shortDef}</p>
          <p>{longDef}</p>
        </div>
      </div>
    </>
  );
};

export default Event;
