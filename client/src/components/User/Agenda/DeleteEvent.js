import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { EventsContext } from "../../../contexts/eventsContext";
import { dateTimeConverter } from "../../../utils/dateConverter";
import { todayISO } from "../../../utils/regexExpressions";

const DeleteEvent = () => {
  const { userProfile } = useContext(AuthContext);
  const { data, fetchData, agendaURL } = useContext(EventsContext);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [myEvents, setMyEvents] = useState(null);

  useEffect(() => {
    fetchData(agendaURL);
  }, [agendaURL]);

  const eventsByOrganizer = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://pvssy-backend.vercel.app/api/events/byOrganizer/${userProfile.userName}`,
        requestOptions
      );
      const result = await response.json();
      console.log("result :", result);
      setMyEvents(result.requestedEvents);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    eventsByOrganizer();
  }, []);

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

  /* eslint-disable no-restricted-globals */
  const handleDelete = async (event) => {
    event.preventDefault();
    const confirmed = confirm(
      "Voulez-vous vraiment effacer les évènements sélectionnés ? L’action est irréversible."
    );

    if (confirmed) {
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
            "https://pvssy-backend.vercel.app/api/events/all",
            requestOptions
          );
          const result = await response.json();
          console.log("result :", result);
          fetchData(agendaURL);
          eventsByOrganizer();
        } catch (error) {
          console.log("error :", error);
        }
      });
    }
  };
  /* eslint-enable no-restricted-globals */

  if (
    !data.upcomingEvents ||
    data.upcomingEvents.length === 0 ||
    !myEvents ||
    myEvents.length === 0
  ) {
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
      <p className="warning msg">La suppression est irréversible.</p>

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
                          disabled={e.date < todayISO ? true : false}
                        />
                        <span>
                          <strong>{e.title}</strong> <span>({dateTime})</span>{" "}
                          {e.date < todayISO ? (
                            <span className="msg archived">archivé</span>
                          ) : e.isPending ? (
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
