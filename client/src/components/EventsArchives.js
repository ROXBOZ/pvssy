import React, { useEffect, useContext } from "react";
import { EventsContext } from "../contexts/eventsContext";
import EventCard from "./Agenda/EventCard";
import { Link } from "react-router-dom";

const Connect = () => {
  const { data, archivedEventEP, fetchData, Error, Loading } =
    useContext(EventsContext);

  console.log("ArchivedEventEP", archivedEventEP);
  console.log("data", data);

  useEffect(() => {
    fetchData(archivedEventEP);
  }, [archivedEventEP]);

  return (
    <>
      <div className="heading-area">
        <div className="heading">
          <p className="pretitle">Pvssy Connect</p>
          <h1>Archives</h1>
        </div>
      </div>

      <div className="card-grid">
        {data.archivedEvents &&
          data.archivedEvents.map((e) => {
            return <EventCard key={e._id} e={e} />;
          })}
        {Error && <p>Erreur</p>}
        {Loading && <p>...chargement...</p>}
      </div>

      <Link to="/agenda" className="simple-link">
        Retour aux évènements à venir
      </Link>
    </>
  );
};

export default Connect;
