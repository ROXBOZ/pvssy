import React, { useContext, useEffect } from "react";
import { EventsContext } from "../contexts/eventsContext";
import EventCard from "./Agenda/EventCard";
import { Link } from "react-router-dom";

const Connect = () => {
  const { data, archivedEvent, Error, fetchData } = useContext(EventsContext);

  console.log("ArchivedEvent", archivedEvent);
  console.log("data", data);

  useEffect(() => {
    fetchData(archivedEvent);
  }, [archivedEvent]);

  return (
    <div>
      <div className="heading-area">
        <div className="heading">
          <p className="pretitle">Pvssy Connect</p>
          <h1>Archives</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            accusantium optio dolore dolorum suscipit ducimus neque quaerat!
            Quas rellendus laudantium, excturi iusto architecto neque natus
            adipisci, eligendi nesciunt eos odit!
          </p>
        </div>
      </div>

      <div className="card-grid">
        {data.archivedEvents &&
          data.archivedEvents.map((e) => {
            return <EventCard key={e._id} e={e} />;
          })}
        {Error && <p>Erreur</p>}
      </div>

      <Link to="/agenda" className="simple-link">
        Retour aux évènements à venir
      </Link>
    </div>
  );
};

export default Connect;
