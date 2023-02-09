import React, { useEffect, useContext } from "react";
import { EventsContext } from "../contexts/eventsContext";
import EventCard from "../components/Connect/EventCard";
import { Link } from "react-router-dom";

import Autocomplete from "../components/Autocomplete";
console.log(new Date());
const Connect = () => {
  const { data, upComingEventEP, fetchData, Error, Loading, regions } =
    useContext(EventsContext);
  console.log();

  useEffect(() => {
    fetchData(upComingEventEP);
  }, [upComingEventEP]);

  // filter : when
  // const monthNames = [
  //   "Janvier",
  //   "Février",
  //   "Mars",
  //   "Avril",
  //   "Mai",
  //   "Juin",
  //   "Juillet",
  //   "Août",
  //   "Septembre",
  //   "Octobre",
  //   "Novembre",
  //   "Décembre",
  // ];
  // const currentDate = new Date();
  // const currentMonthIndex = currentDate.getMonth();
  // const currentMonthName = monthNames[currentMonthIndex];
  // const currentYear = currentDate.getFullYear();

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
            <input type="date" id="date" name="date" />
          </div>

          <Autocomplete suggestions={regions} />

          <div className="filter">
            <input
              placeholder="Culture"
              type="text"
              id="category"
              name="category"
            />
          </div>
        </div>
      </div>

      <div className="card-grid">
        {data.upcomingEvents &&
          data.upcomingEvents.map((e) => {
            return <EventCard key={e._id} e={e} />;
          })}
        {Error && <p>Erreur</p>}
        {Loading && <p>...chargement...</p>}
      </div>

      <Link to="archives" className="simple-link">
        Consulter les évènements passés
      </Link>
    </>
  );
};

export default Connect;
