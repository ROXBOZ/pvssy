import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { EventsContext } from "../../../contexts/eventsContext";
import { dateTimeConverter } from "../../../utils/dateConverter";

const DeleteEvent = () => {
  const { userProfile } = useContext(AuthContext);
  const { data, fetchData, upComingEvent } = useContext(EventsContext);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    fetchData(upComingEvent);
  }, [upComingEvent]);

  const eventsByOrganizer = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:5000/api/events/byOrganizer/${userProfile.userName}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log("result by organizer", result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    eventsByOrganizer();
  }, [eventsByOrganizer]);

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
        .then((result) => {
          console.log(result);
          window.location.reload();
        })
        .catch((error) => console.log("error", error));
    });
  };

  if (!data.upcomingEvents || data.upcomingEvents.length === 0) {
    return (
      <>
        <h1>
          Supprimer un évènement<sup>prototype</sup>
        </h1>
        <p className="warning msg">
          <strong>Aucun évènement dans le calendrier!</strong>
        </p>
      </>
    );
  }

  return (
    <>
      <h1>
        Supprimer un évènement<sup>prototype</sup>
      </h1>
      <p className="warning msg">
        Une fois supprimé, l’évènement ne peut pas être récupéré.
      </p>

      <form className="grid-form">
        <div className="form-section">
          <div>
            {userProfile && userProfile.userIsAdmin === true && (
              <ul className="check-list">
                {data.upcomingEvents &&
                  data.upcomingEvents.map((e) => {
                    const dateTime = dateTimeConverter(e.date);
                    return (
                      <li key={e._id}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          value={e._id}
                          onChange={(e) => handleChange(e)}
                        />
                        <strong>{e.title}</strong>&nbsp;(<span>{dateTime}</span>
                        ) par {e.organizer}
                      </li>
                    );
                  })}
              </ul>
            )}
            <button onClick={handleDelete}>
              Supprimer le(s) évènement(s) sélectionné(s)
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DeleteEvent;
