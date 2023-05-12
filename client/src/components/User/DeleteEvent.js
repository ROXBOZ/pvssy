import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { EventsContext } from "../../contexts/eventsContext";
import { dateTimeConverter } from "../../utilities/dateConverter";
import { todayISO } from "../../utilities/regexExpressions";
import { serverURL } from "../../utilities/serverURL";

const DeleteEvent = () => {
  const { userProfile } = useContext(AuthContext);
  const { data, fetchData, agendaURL } = useContext(EventsContext);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [myEvents, setMyEvents] = useState(null);

  useEffect(() => {
    fetchData(agendaURL);
    eventsByOrganizer(userProfile.userEmail);
  }, [agendaURL]);

  const eventsByOrganizer = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${serverURL}/api/events/byOrganizer/${userProfile.userEmail}`,
        requestOptions
      );
      const result = await response.json();
      console.log("result :", result);
      setMyEvents(result.requestedEvents);
      console.log("myEvents :", myEvents);
    } catch (error) {
      console.log("error :", error);
    }
  };

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
            `${serverURL}/api/events/all`,
            requestOptions
          );
          const result = await response.json();
          console.log("result :", result);
          fetchData(agendaURL);
          eventsByOrganizer(userProfile.userEmail);
        } catch (error) {
          console.log("error :", error);
        }
      });
    }
  };

  // const handleDelete = async (event) => {
  //   event.preventDefault();
  //   const confirmed = confirm(
  //     "Voulez-vous vraiment effacer les évènements sélectionnés ? L’action est irréversible."
  //   );

  //   if (confirmed) {
  //     selectedEvents.map(async (e) => {
  //       const myHeaders = new Headers();
  //       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //       const urlencoded = new URLSearchParams();
  //       urlencoded.append("_id", e);

  //       const requestOptions = {
  //         method: "DELETE",
  //         headers: myHeaders,
  //         body: urlencoded,
  //         redirect: "follow",
  //       };

  //       try {
  //         const response = await fetch(
  //           `${serverURL}/api/events/all`,
  //           requestOptions
  //         );
  //         const result = await response.json();
  //         console.log("result :", result);
  //         fetchData(agendaURL);
  //         // eventsByOrganizer();
  //       } catch (error) {
  //         console.log("error :", error);
  //       }
  //     });
  //   }
  // };
  /* eslint-enable no-restricted-globals */

  if (
    !data.upcomingEvents ||
    data.upcomingEvents.length === 0 ||
    !myEvents ||
    myEvents.length === 0
  ) {
    return <p className="warning msg">Aucun évènement à supprimer</p>;
  }

  return (
    <>
      <form className="grid-form">
        <div className="form-section">
          <div className="check-list-container">
            {userProfile && userProfile.userIsAdmin === true ? (
              <>
                <ul className="check-list">
                  {data.upcomingEvents &&
                    data.upcomingEvents.map((e) => {
                      const dateTime = dateTimeConverter(e.eventDateStart);
                      return (
                        <li key={e._id}>
                          {console.log("e :", e)}
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={e._id}
                            onChange={(e) => handleChange(e)}
                          />
                          <strong>{e.title}</strong>&nbsp;
                          <span>({dateTime})</span> par {e.organizer}
                        </li>
                      );
                    })}
                </ul>
              </>
            ) : (
              userProfile &&
              userProfile.userIsAdmin === false && (
                <ul className="check-list">
                  {myEvents &&
                    myEvents.map((e) => {
                      const dateTime = dateTimeConverter(e.eventDateStart);
                      return (
                        <li key={e._id}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={e._id}
                            onChange={(e) => handleChange(e)}
                            disabled={
                              e.eventDateStart < todayISO ? true : false
                            }
                          />
                          <strong>{e.title}</strong>&nbsp;
                          <span>({dateTime})</span>
                          {dateTime < todayISO ? (
                            <span className="msg archived">archivé</span>
                          ) : e.isPending ? (
                            <span className="msg pending">en attente</span>
                          ) : (
                            <span className="msg success">approuvé</span>
                          )}
                        </li>
                      );
                    })}
                </ul>
              )
            )}

            <div className="flex-center" style={{ marginTop: "5vh" }}>
              <button onClick={handleDelete}>Supprimer</button>
              <p className="warning msg">La suppression est irréversible.</p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DeleteEvent;
