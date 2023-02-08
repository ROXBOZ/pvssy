import React, { useEffect, useContext } from "react";
import { EventsContext } from "../contexts/eventsContext";
import EventCard from "../components/Agenda/EventCard";
import { Link } from "react-router-dom";

const Agenda = () => {
  // fetch data
  const { data, url, fetchData, Error, Loading } = useContext(EventsContext);
  useEffect(() => {
    fetchData(url);
  }, [url]);

  // filter : where
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
      <div className="full-width-area">
        <p className="pretitle">Pvssy Connect</p>
        <h1>Blablabla</h1>
        <ul className="category-submenu">
          {/* <li>
            <Link to="/">Évènements passés</Link>
          </li> */}
        </ul>

        <div className="filter-dashboard">
          <div className="filter">
            <input
              type="radio"
              id="thisWeek"
              name="dateFilter"
              value="cette semaine"
            ></input>
            <label for="thisWeek">Cette semaine</label>

            <input
              type="radio"
              id="thisMonth"
              name="dateFilter"
              value="ce mois"
            ></input>
            <label for="thisWeek">
              {currentMonthName} {currentYear}
            </label>
          </div>
          <div className="filter">
            <label htmlFor="region">Où ?</label>
            <input
              onChange={handleRegionInputOnChange}
              placeholder="...Lausanne"
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

export default Agenda;
