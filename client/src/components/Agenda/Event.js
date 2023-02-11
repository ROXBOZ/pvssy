import React from "react";
import CountdownTimer from "../CountdownTimer";
import { useLocation } from "react-router-dom";

const today = new Date().getDay;
console.log("today", today);

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
  } = location.state.content;
  console.log("today", today);
  console.log("newDate(isoDate)", new Date(isoDate).getHours());

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
          <div className="img-holder"></div>
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
