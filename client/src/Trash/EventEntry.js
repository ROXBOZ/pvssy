import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ e }) => {
  const id = e._id;
  const title = e.title;
  const isoDate = e.date;
  const organizer = e.organizer;
  const organizerWebsite = e.organizerWebsite;
  const shortDef = e.shortDef;
  const longDef = e.longDef;
  const isOnline = e.isOnline;
  const onlineMeeting = e.onlineMeeting;
  const address = e.address;
  const city = e.city;
  const email = e.email;
  const tel = e.tel;
  const entryFee = e.entryFee;

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
  };

  return (
    <Link
      state={{ content: eventDetail }}
      className="link-card agenda"
      to={{
        pathname: `/agenda/${title.toLowerCase().replace(/\s/g, "-")}`,
      }}
      key={id}
      alt={title}
    >
      <div
        className="card"
        style={{ background: generateColor(color1, color2) }}
      >
        {/* <h3>{shortTitle}</h3> */}
        <p className="card-date">
          {dateTime}
          <br />
          {isOnline ? (
            <span className="card-date"> ONLINE</span>
          ) : (
            <span className="card-location">{city}</span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
