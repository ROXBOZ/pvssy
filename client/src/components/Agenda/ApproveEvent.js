import { useEffect, useState } from "react";
import PendingEventCard from "./PendingEventCard";

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
      console.log("result :", result.pendingEvents);
      setPendingEvents(result.pendingEvents);
      console.log("pendingEvents :", pendingEvents);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPendingEvent();
  }, []);

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

  return (
    <div>
      <h1>
        Évènements en attente<sup>prototype</sup>
      </h1>
      {console.log("pendingEvents :", pendingEvents)}
      {pendingEvents &&
        pendingEvents.map((e) => {
          return <PendingEventCard event={e} key={e._id} />;
        })}
    </div>
  );
};

export default ApproveEvent;
