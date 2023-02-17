import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ e }) => {
  const id = e._id;
  const title = e.title;
  const shortDef = e.shortDef;
  const longDef = e.longDef;
  const online = e.online;
  const onlineMeeting = e.onlineMeeting;
  const address = e.address;
  const city = e.city;
  const email = e.email;
  const tel = e.tel;
  const entryFee = e.entryFee;
  const highlight = e.highlight;
  const cover = e.imgCover;
  const caption = e.imgCaption;
  const credits = e.imgCredits;

  // Date and Time formating
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
  const date = newDate
    .toLocaleDateString("fr-CH", dateOptions)
    .replace(/ /g, "\u00A0");
  const dateTime = newDate.toLocaleDateString("fr-CH", dateTimeoptions);

  //NOTE Title max. length >>> make a const

  let shortTitle;
  if (title.length > 30) {
    shortTitle = title.substring(0, 30) + "...";
  } else {
    shortTitle = title;
  }

  // Random Color Generator
  // const generateGradient = () => {
  //   const color1 = generateColor("#f4a07c", "#ff50d7");
  //   const color2 = generateColor("#f5733c", "#fd97e5");
  //   return `linear-gradient(${color1}, ${color2})`;
  // };
  const color1 = "#f5733c";
  const color2 = "#ff50d7";
  const generateColor = (color1, color2) => {
    const r1 = parseInt(color1.slice(1, 3), 16); // red component of the first color
    const g1 = parseInt(color1.slice(3, 5), 16); // green component of the first color
    const b1 = parseInt(color1.slice(5, 7), 16); // blue component of the first color
    const r2 = parseInt(color2.slice(1, 3), 16); // red component of the second color
    const g2 = parseInt(color2.slice(3, 5), 16); // green component of the second color
    const b2 = parseInt(color2.slice(5, 7), 16); // blue component of the second color
    const r = Math.floor(Math.random() * (r2 - r1 + 1) + r1); // random red component
    const g = Math.floor(Math.random() * (g2 - g1 + 1) + g1); // random green component
    const b = Math.floor(Math.random() * (b2 - b1 + 1) + b1); // random blue component
    const color = `rgb(${r}, ${g}, ${b})`; // combine components into an RGB color string
    return color;
  };

  const eventDetail = {
    id,
    title,
    isoDate,
    date,
    dateTime,
    shortDef,
    longDef,
    online,
    onlineMeeting,
    address,
    city,
    email,
    tel,
    entryFee,
    highlight,
    cover,
    caption,
    credits,
  };

  //NOTE - obsolete ???
  // let hightlighted = {
  //   gridColumn: "span 2",
  // };

  //NOTE - obsolete ???
  // let backgroundImg = {
  //   backgroundImage: `url(${cover})`,
  // };

  return (
    <Link
      // style={highlight ? hightlighted : null}
      state={{ content: eventDetail }}
      className="link-card"
      to={{
        pathname: `/agenda/${title.toLowerCase().replace(/\s/g, "-")}`,
      }}
      key={id}
      alt={title}
    >
      {/* <div className="card" style={cover ? backgroundImg : null}> */}
      <div
        className="card"
        style={{ background: generateColor(color1, color2) }}
      >
        <div className="card-text">
          <h3>{shortTitle}</h3>
          <p className="card-date">{date}</p>
          {online ? (
            <p className="card-location">ONLINE</p>
          ) : (
            <p className="card-location">{city}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
