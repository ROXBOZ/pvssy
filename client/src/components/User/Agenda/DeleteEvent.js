import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { EventsContext } from "../../../contexts/eventsContext";
import { dateTimeConverter } from "../../../utils/dateConverter";

const DeleteEvent = () => {
  const { userProfile } = useContext(AuthContext);
  const { data, fetchData, upComingEvent } = useContext(EventsContext);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [myEvents, setMyEvents] = useState(null);

  // unify with another similar pages
  useEffect(() => {
    fetchData(upComingEvent);
  }, [upComingEvent]);

  const eventsByOrganizer = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/byOrganizer/${userProfile.userName}`,
        requestOptions
      );
      const result = await response.json();
      console.log("result :", result);
      setMyEvents(result.requestedEvents);
    } catch (error) {
      console.log("error :", error);
    }
  };

  console.log("userProfile :", userProfile);

  useEffect(() => {
    eventsByOrganizer();
  }, []);

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

  // REVIEW this should be in context
  const handleChange = (e) => {
    const eventId = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedEvents([...selectedEvents, eventId]);
    } else {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    }
  };

  // FIXME ERROR WHEN ATTEMPTING TO FETCH THE RESOURCE
  const handleDelete = async (event) => {
    event.preventDefault();
    selectedEvents.map(async (e) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("_id", e);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/events/all",
          requestOptions
        );
        const result = await response.json();
        console.log("result :", result);
        fetchData(upComingEvent);
      } catch (error) {
        console.log("error :", error);
      }
    });
  };

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
            {userProfile && userProfile.userIsAdmin === true ? (
              <>
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
                          <strong>{e.title}</strong>&nbsp;(
                          <span>{dateTime}</span>) par {e.organizer}
                        </li>
                      );
                    })}
                </ul>
              </>
            ) : (
              <ul className="check-list">
                {myEvents &&
                  myEvents.map((e) => {
                    const dateTime = dateTimeConverter(e.date);
                    return (
                      <li key={e._id}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          value={e._id}
                          onChange={(e) => handleChange(e)}
                        />
                        <span>
                          <strong>{e.title}</strong> <span>({dateTime})</span>{" "}
                          {e.isPending ? (
                            <span className="msg pending">en attente</span>
                          ) : (
                            <span className="msg success">approuvé</span>
                          )}
                        </span>
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
