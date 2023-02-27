import { useEffect, useState } from "react";
import PendingEventCard from "./PendingEventCard";
import { dateTimeConverter } from "../../../utils/dateConverter";

const ApproveEvent = () => {
  const [pendingEvents, setPendingEvents] = useState(null);

  const getPendingEvent = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/events/pending",
        requestOptions
      );
      const result = await response.json();
      setPendingEvents(result.pendingEvents);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPendingEvent();
  }, []);

  // if no pending events
  if (!pendingEvents || pendingEvents.length === 0) {
    return (
      <>
        <h1>
          Approuver un évènement en attente<sup>prototype</sup>
        </h1>
        <p className="success msg">
          <strong>🏝️ Pas d’évènement en attente.</strong>
        </p>
      </>
    );
  }

  // in alphabetical order
  const sortedEvents = [...pendingEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div>
      <h1>
        Évènements en attente<sup>prototype</sup>
      </h1>
      <p className="msg warning">
        Une fois approuvé, un évènement ne peut qu’être supprimé via l’onglet.
      </p>

      {sortedEvents &&
        sortedEvents.map((e) => {
          const dateTime = dateTimeConverter(e.date);
          return <PendingEventCard event={e} key={e._id} dateTime={dateTime} />;
        })}
    </div>
  );
};

export default ApproveEvent;
