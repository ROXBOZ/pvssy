import React, { useEffect, useState } from "react";
import getToken from "../utils/getToken";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [eventType, setEventType] = useState("offline");
  const [error, setError] = useState(null);

  const getProfile = async () => {
    const token = getToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        requestOptions
      );

      const result = await response.json();
      console.log("result", result);
      setUserProfile({
        userName: result.user.userName,
        userEmail: result.user.userEmail,
        userAvatar: result.user.userAvatar,
      });
      setError(null);
    } catch (error) {
      console.log("can not fetch", error);
      setUserProfile(null);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {userProfile && (
        <div className="userProfile-info">
          <img
            className="userProfile-avatar"
            src={userProfile.userAvatar}
            alt={userProfile.userName}
          />
          <p>
            {userProfile.userName}
            <br />
            {userProfile.userEmail}
          </p>
        </div>
      )}
      <h1>Ajouter un évènement</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis amet
        in reiciendis nobis dolorum ad facilis rem modi assumenda nesciunt
        exercitationem ipsum totam, error dicta dolorem alias velit hic
        corporis.
      </p>

      <form className="grid-form">
        <div className="event-title-label">
          <label htmlFor="eventTitle">Titre</label>
        </div>
        <div className="event-title-input">
          <input
            name="eventTitle"
            id="eventTitle"
            type="text"
            placeholder="Titre de l’évènement"
          />
        </div>
        <div className="event-date-label">
          <label htmlFor="eventDate">Date</label>
        </div>
        <div className="event-date-input">
          <input
            placeholder="Date de l’évènement"
            id="eventDate"
            type="date"
            name="eventDate"
          />
        </div>
        <div className="event-shortDef-label">
          <label htmlFor="eventShortDef">En bref</label>
        </div>
        <div className="event-shortDef-input">
          <textarea
            name="event-shortDef"
            id="eventShortDef"
            placeholder="Veuillez entrer une définition de l'événement courte et concise de max. 60 mots."
          />
        </div>
        <div className="event-longDef-label">
          <label htmlFor="eventLongDef">En détails</label>
        </div>
        <div className="event-longDef-input">
          <textarea
            name="event-longDef"
            id="eventLongDef"
            rows="4"
            cols="50"
            placeholder="La définition devrait expliquer brièvement de quoi il s'agit, le public cible et les objectifs de l'événement. Vous pouvez également inclure d'autres informations pertinentes, telles que les sujets abordés ou les intervenant·e·s invité·e·s."
          />
        </div>
        <div className="event-type-label">
          <label htmlFor="eventType">Format</label>
        </div>
        <div className="user-type-input">
          <span>
            <input
              className="form-check-input"
              id="online"
              type="radio"
              name="eventType"
              checked={eventType === "online"}
              onChange={() => setEventType("online")}
            />
            <label htmlFor="online">Online</label>
          </span>
          <span>
            <input
              className="form-check-input"
              id="offline"
              type="radio"
              name="eventType"
              checked={eventType === "offline"}
              onChange={() => setEventType("offline")}
            />
            <label htmlFor="offline">Sur place</label>
          </span>
        </div>
        {eventType === "offline" && (
          <>
            <div className="event-address-label">
              <label htmlFor="eventAddress">Adresse</label>
            </div>
            <div className="event-address-input">
              <input
                name="eventAddress"
                id="eventAddress"
                type="text"
                placeholder="Rue, numéro"
              />
            </div>
            <div className="event-city-label">
              <label htmlFor="eventCity">Lieu</label>
            </div>
            <div className="event-city-input">
              <input
                name="eventCity"
                id="eventCity"
                type="text"
                placeholder="ZIP, Lieu"
              />
            </div>
          </>
        )}
        {eventType === "online" && (
          <>
            <div className="event-onlineMeeting-label">
              <label htmlFor="onlineMeeting">Lien</label>
            </div>
            <div className="event-onlineMeeting-input">
              <input
                name="onlineMeeting"
                id="onlineMeeting"
                type="text"
                placeholder="https://..."
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Profile;
