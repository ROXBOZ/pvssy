import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { EventsContext } from "../../contexts/eventsContext";

const ModifyEvent = () => {
  const { userProfile } = useContext(AuthContext);
  const { data, fetchData, upComingEventEP } = useContext(EventsContext);

  useEffect(() => {
    fetchData(upComingEventEP);
  }, [upComingEventEP]);

  return (
    <>
      <h1>
        Modifier un évènement<sup>prototype</sup>
      </h1>
      {userProfile && userProfile.userIsAdmin === true ? (
        <form className="grid-form">
          <div className="form-section">
            <div>
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
                          type="radio"
                          name="modifyEvent"
                          className="form-check-input"
                          value={e._id}
                          //  onChange={(e) => handleChange(e)}
                        />
                        <strong>{e.title}</strong>&nbsp;(<span>{dateTime}</span>
                        )
                      </li>
                    );
                  })}
              </ul>

              <button
              //   onClick={handleDelete}
              >
                Modifier l’évènement sélectionné
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p>...</p>
      )}
    </>
  );
};

export default ModifyEvent;
