import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ e }) => {
  const id = e._id;
  const title = e.title;

  // date and time formatting
  const isoDate = e.date;
  const newDate = new Date(isoDate);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const dateTimeoptions = { ...dateOptions, ...timeOptions };
  const date = newDate.toLocaleDateString("fr-CH", dateOptions);
  const dateTime = newDate.toLocaleDateString("fr-CH", dateTimeoptions);

  const shortDef = e.shortDef;
  const longDef = e.longDef;
  const onLine = e.onLine;
  const meetingLink = e.meetingLink;
  const adresse = e.adresse;
  const city = e.city;
  const email = e.email;
  const tel = e.tel;
  const freeEntry = e.freeEntry;
  const categories = e.categories;
  const entryFee = e.entryFee;
  const highlight = e.highlight;

  const eventDetail = {
    id,
    title,
    isoDate,
    date,
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
    categories,
    entryFee,
    highlight,
  };

  let shortTitle;
  if (title.length > 20) {
    shortTitle = title.substring(0, 20) + "...";
  } else {
    shortTitle = title;
  }

  let hightlighted = {
    gridColumn: "span 2",
  };

  return (
    <Link
      style={highlight ? hightlighted : null}
      state={{ content: eventDetail }}
      className="link-card"
      to={{ pathname: `/connect/${id}` }}
      key={id}
      alt={title}
    >
      <div className="card">
        <h3>{shortTitle}</h3>
        <p>{date}</p>
        {onLine ? <p>ONLINE</p> : <p>{city}</p>}
      </div>
    </Link>
  );
};

export default EventCard;
