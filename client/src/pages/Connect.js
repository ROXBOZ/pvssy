import React, { useEffect, useContext } from "react";
import { EventsContext } from "../contexts/eventsContext";
import EventCard from "../components/Connect/EventCard";
import { Link } from "react-router-dom";

const Connect = () => {
  // fetch data
  const { data, url, fetchData, Error, Loading } = useContext(EventsContext);
  useEffect(() => {
    fetchData(url);
  }, [url]);

  // filter : where

  const regions = [
    "Berne",
    "Fribourg",
    "Genève",
    "La Chaux-de-Fonds",
    "Lausanne",
    "Montreux",
    "Neuchâtel",
    "Nyon",
    "Sion",
    "Vevey",
    "Yverdon-les-Bains",
  ];
  const handleRegionInputOnChange = () => {
    alert("fetch events by region + suggest drop down");
    // to lower case
    // check box ONLINE disable Input
  };

  // filter : when
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentMonthName = monthNames[currentMonthIndex];
  const currentYear = currentDate.getFullYear();

  return (
    <>
      <div className="heading-area">
        <div className="heading">
          <p className="pretitle">Pvssy Connect</p>
          <h1>
            Agenda d'évènements collaboratif pour organiser des réunions et des
            activités en temps réel
          </h1>
        </div>

        <div className="filter-dashboard">
          <div className="filter">
            <label for="date">Quand ?</label>
            <input type="date" id="date" name="date" />
          </div>

          <div className="filter">
            <label htmlFor="region">Où ?</label>
            <input
              onChange={handleRegionInputOnChange}
              placeholder="Région"
              type="text"
              id="region"
              name="region"
            />
          </div>

          <div className="filter">
            <label htmlFor="category">Quoi ?</label>
            <input
              // onChange={handleCategoryInputOnChange}
              placeholder="...Culturel"
              type="text"
              id="category"
              name="category"
            />
          </div>
        </div>
      </div>

      <div className="card-grid">
        {data &&
          data.map((e) => {
            return <EventCard key={e._id} e={e} />;
          })}
      </div>

      {Error && <p>Error</p>}
      {Loading && <p>...loading...</p>}
    </>
  );
};

export default Connect;
