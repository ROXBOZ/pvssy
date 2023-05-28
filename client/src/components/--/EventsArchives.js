import React, { useContext, useEffect } from "react";
import { EventsContext } from "../../contexts/eventsContext";
import EventCard from "./Agenda/EventCard";
import { Link } from "react-router-dom";
import { HeadingArea } from "../../utilities/HeadingArea";

const Connect = () => {
  const { data, archivesURL, Error, fetchData } = useContext(EventsContext);

  useEffect(() => {
    fetchData(archivesURL);
  }, [archivesURL]);

  return (
    <div>
      <HeadingArea pretitle="Agenda" title="Archives" level="h1" />

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
