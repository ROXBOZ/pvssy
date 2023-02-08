import React from "react";
import CountdownTimer from "../CountdownTimer";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
      <div className="full-width-area">
        <h1>{title}</h1>
        <p>
          {dateTime}
          <br />

          {onLine && (
            <span className="button-countdown">
              <button
                disabled={new Date(isoDate) > new Date() ? true : false}
                onClick={redirectToMeeting}
              >
                Rejoindre la réunion
              </button>
              <CountdownTimer isoDate={isoDate} />
            </span>
          )}
          {!onLine && (
            <span>
              {adresse}, {city}
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
          <hr />
          <h2>Prix</h2>
          {freeEntry ? <p>entrée libre</p> : <p>Entrée : {entryFee} CHF</p>}
          <hr />
          <h2>Réservations</h2>
          <p>
            <a mailto={email}>{email}</a>
            {tel && (
              <>
                {" "}
                / <a href={`tel:${tel}`}>{tel}</a>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Event;
