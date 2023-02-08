import React, { useEffect, useContext } from "react";
import { EventsContext } from "../contexts/eventsContext";
import EventCard from "../components/Agenda/EventCard";
import { Link } from "react-router-dom";

const Agenda = () => {
  const { data, url, fetchData, Error, Loading } = useContext(EventsContext);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return (
    <>
      <div className="full-width-area">
        <p className="pretitle">Pvssy Connect</p>
        <h1>Blablabla</h1>
        <ul className="category-submenu">
          <li>
            <Link to="/">Évènements passés</Link>
          </li>
        </ul>
        <p className="red">Filters : months, région, category, douleur</p>
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
