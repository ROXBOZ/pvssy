import { useEffect, useState } from "react";
import PendingEventCard from "./PendingEventCard";
import { dateTimeConverter } from "../../utilities/dateConverter";
import { serverURL } from "../../utilities/serverURL";

const ApproveEvent = () => {
  const [pendingEvents, setPendingEvents] = useState(null);

  const getPendingEvent = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${serverURL}/api/events/pending`,
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
    return <p className="success msg">Pas d’évènement en attente.</p>;
  }

  // in alphabetical order
  const sortedEvents = [...pendingEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  console.log("sortedEvents :", sortedEvents);

  return (
    <form className="grid-form">
      <div className="form-section">
        <div className="check-list-container">
          <p
            className="msg warning flex-center"
            style={{ marginBottom: "5vh" }}
          >
            Une fois approuvé, un évènement ne peut qu’être supprimé via
            l’onglet.
          </p>
          <div className="check-list">
            {sortedEvents &&
              sortedEvents.map((e) => {
                const dateTime = dateTimeConverter(e.eventDateStart);

                return (
                  <PendingEventCard
                    event={e}
                    key={e._id}
                    dateTime={dateTime}
                    getPendingEvent={getPendingEvent}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ApproveEvent;
