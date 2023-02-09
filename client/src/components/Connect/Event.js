import React from "react";
import CountdownTimer from "../CountdownTimer";
import { useLocation } from "react-router-dom";

const today = new Date();
today.setHours(0, 0, 0, 0);
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
            <p>
              {adresse}, {city}
            </p>
          )}

          <p>
            {freeEntry ? (
              <span>entrée libre</span>
            ) : (
              <span>Entrée : {entryFee} CHF</span>
            )}
            <br />
            <a href={`mailto:${email}`}>{email}</a>
            <br />
            {tel && <a href={`tel:${tel}`}>{tel}</a>}
          </p>
          {onLine && (
            <span className="button-countdown">
              <button
                disabled={new Date(isoDate) != today ? true : false}
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
