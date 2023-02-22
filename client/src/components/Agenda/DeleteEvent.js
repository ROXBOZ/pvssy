import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { EventsContext } from "../../contexts/eventsContext";

const DeleteEvent = () => {
  const { userProfile } = useContext(AuthContext);
  const { data, fetchData, upComingEventEP } = useContext(EventsContext);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    fetchData(upComingEventEP);
  }, [upComingEventEP]);

  const handleChange = (e) => {
    const eventId = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedEvents([...selectedEvents, eventId]);
    } else {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    }
  };

  const handleDelete = () => {
    selectedEvents.map((e) => {
      console.log("element to delete", e);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("_id", e);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
      };

      fetch("http://localhost:5000/api/events/all", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    });
  };

  return (
    <>
      <h1>Supprimer un évènement</h1>
      <p className="warning-msg">
        ⚠️ Danger : une fois supprimé, l’évènement ne peut PAS être récupéré.
      </p>

      {userProfile && userProfile.userIsAdmin === true && (
        <>
          <ul className="check-list">
            {data.upcomingEvents &&
              data.upcomingEvents.map((e) => {
                const isoDate = e.date;
                const newDate = new Date(isoDate);
                const dateOptions = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                const timeOptions = {
                  hour: "numeric",
                  minute: "numeric",
                };
                const dateTimeoptions = { ...dateOptions, ...timeOptions };

                const dateTime = newDate.toLocaleDateString(
                  "fr-CH",
                  dateTimeoptions
                );
                return (
                  <li key={e._id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={e._id}
                      onChange={(e) => handleChange(e)}
                    />
                    <strong>{e.title}</strong>&nbsp;(<span>{dateTime}</span>)
                  </li>
                );
              })}
          </ul>

          <button onClick={handleDelete}>
            Supprimer le(s) évènement(s) sélectionné(s)
          </button>
        </>
      )}
    </>
  );
};

export default DeleteEvent;
