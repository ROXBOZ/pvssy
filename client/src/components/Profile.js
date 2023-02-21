import React, { useEffect, useState, useContext } from "react";
import getToken from "../utils/getToken";
import { Link } from "react-router-dom";
import { EventsContext } from "../contexts/eventsContext";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [eventType, setEventType] = useState("offline");
  const [eventEntry, setEventEntry] = useState("gratuite");
  const [error, setError] = useState(null);
  const { regions } = useContext(EventsContext);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [newEvent, setNewEvent] = useState(null);

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

      setUserProfile({
        userName: result.user.userName,
        userEmail: result.user.userEmail,
        userAvatar: result.user.userAvatar,
        userIsAdmin: result.user.userIsAdmin,
      });
      setError(null);
    } catch (error) {
      console.log("can not fetch", error);
      setUserProfile(null);
    }
  };

  // For everyone using the form
  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value }); // computed property names
  };

  // FOR ADMIN users
  const addEvent = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: newEvent.eventTitle,
      date: newEvent.eventDateTime,
      shortDef: newEvent.eventShortDef,
      longDef: newEvent.eventLongDef,
      online: eventType === "online" ? true : false,
      onlineMeeting: eventType === "online" ? newEvent.onlineMeeting : null,
      address: eventType === "online" ? null : newEvent.eventAddress,
      city: eventType === "online" ? null : newEvent.eventCity,
      email: newEvent.eventEmail,
      tel: newEvent.eventTel,
      entryFee: newEvent.admissionFee,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/events/all",
        requestOptions
      );
      const result = response.json();
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Region Dropdown
  const handleInputRegionChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (newValue.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matchingSuggestions = regions.filter((suggestion) =>
      suggestion.toLowerCase().includes(newValue.toLowerCase())
    );
    setSuggestions(matchingSuggestions);
    setShowSuggestions(matchingSuggestions.length > 0);
  };
  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    setShowSuggestions(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex(
        (selectedSuggestionIndex + 1) % suggestions.length
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex(
        (selectedSuggestionIndex - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      handleSuggestionClick(suggestions[selectedSuggestionIndex]);
    }
  };

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
            <br />
            {userProfile.userIsAdmin ? (
              <span>administrateur·ice</span>
            ) : (
              <span>éditeur·ice</span>
            )}
          </p>
        </div>
      )}
      <h1>
        Proposer un évènement<sup>prototype</sup>
      </h1>
      <p>
        Nous examinons toutes les soumissions et ajoutons les évènements
        approuvés à notre calendrier. Veuillez noter que nous ne pouvons pas
        garantir la publication d'un événement qui aurait lieu moins de trois
        jours après sa soumission.
      </p>

      <form className="grid-form">
        <h2>Formulaire à compléter</h2>
        <div className="form-section">
          <h3>Informations essentielles</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            dolore quibusdam quasi eum possimus et dolor facere quia totam.
            Provident repellendus animi cumque inventore unde asperiores debitis
            quo sit nemo!
          </p>
          <div className="event-title-label flex-center">
            <label htmlFor="eventTitle">Titre *</label>
          </div>
          <div className="event-title-input">
            <input
              name="eventTitle"
              id="eventTitle"
              type="text"
              placeholder="Titre de l’évènement"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="event-date-label flex-center">
            <label htmlFor="eventDate">Date et heure *</label>
          </div>
          <div className="event-date-input">
            <input
              name="eventDateTime"
              id="eventDateTime"
              type="datetime-local"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="event-shortDef-label flex-center">
            <label htmlFor="eventShortDef">En bref *</label>
          </div>
          <div className="event-shortDef-input">
            <textarea
              name="eventShortDef"
              id="eventShortDef"
              placeholder="Veuillez entrer une définition de l'événement courte et concise de max. 60 mots."
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="event-longDef-label flex-center">
            <label htmlFor="eventLongDef">En détails</label>
          </div>
          <div className="event-longDef-input">
            <textarea
              name="eventLongDef"
              id="eventLongDef"
              rows="5"
              placeholder="La définition en détails n’est pas obligatoire mais fortement recommandée. Elle devrait expliquer brièvement de quoi il s'agit, le public cible et les objectifs de l'événement. Vous pouvez également inclure d'autres informations pertinentes, telles que les sujets abordés ou les intervenant·e·s invité·e·s."
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-section">
          <h3>Format</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
            numquam ut accusamus aliquid quas, a voluptatem quam reiciendis
            voluptatibus expedita aliquam rem magni doloribus tempore corporis
            culpa deserunt repudiandae iusto.
          </p>
          <div className="event-type-label flex-center">
            <label htmlFor="eventType">Format *</label>
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
              <div className="event-address-label flex-center">
                <label htmlFor="eventAddress">Adresse *</label>
              </div>
              <div className="event-address-input">
                <input
                  name="eventAddress"
                  id="eventAddress"
                  type="text"
                  placeholder="Rue, numéro"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="event-city-label flex-center">
                <label htmlFor="eventCity">Lieu *</label>
              </div>
              <div className="event-city-input">
                <input
                  name="eventCity"
                  id="eventCity"
                  type="text"
                  placeholder="ZIP, Lieu"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="event-region-label flex-center">
                <label htmlFor="eventRegion">Région *</label>
              </div>
              <div className="event-region-input">
                <input
                  name="eventRegion"
                  id="eventRegion"
                  type="text"
                  placeholder="Région"
                  value={value}
                  onChange={handleInputRegionChange}
                  onKeyDown={handleKeyDown}
                  required
                />
              </div>
              {showSuggestions && (
                <ul className="suggestions form-dropdown-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={
                        index === selectedSuggestionIndex
                          ? "suggestion-active"
                          : ""
                      }
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {eventType === "online" && (
            <>
              <div className="event-onlineMeeting-label flex-center">
                <label htmlFor="onlineMeeting">Lien *</label>
              </div>
              <div className="event-onlineMeeting-input">
                <input
                  name="onlineMeeting"
                  id="onlineMeeting"
                  type="text"
                  placeholder="https://..."
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}
        </div>
        <div className="form-section">
          <h3>Réservations</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            accusamus officia quae nisi. Dolorem nihil, sapiente corrupti nulla
            omnis veritatis, asperiores totam quisquam a maxime error quibusdam
            sit aliquam accusamus!
          </p>
          <div className="event-tel-label flex-center">
            <label htmlFor="eventTel">Téléphone</label>
          </div>
          <div className="event-tel-input">
            <input
              name="eventTel"
              id="eventTel"
              type="tel"
              pattern="\+\d{2}\(\d\)\d{2}\s\d{3}\s\d{2}\s\d{2}"
              placeholder="+41(0)..."
              onChange={handleInputChange}
            />
          </div>
          <div className="event-email-label flex-center">
            <label htmlFor="eventTel">Adresse Email</label>
          </div>
          <div className="event-email-input">
            <input
              name="eventEmail"
              id="eventEmail"
              type="text"
              placeholder="info@asso..."
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-section">
          <h3>Entrées</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel itaque
            iusto aliquid distinctio neque? Impedit, ullam cum nobis,
            consectetur, harum rem sunt aperiam hic magni ratione soluta
            delectus. Natus, aliquam.
          </p>
          <div className="event-entry-label flex-center">
            <label htmlFor="eventEntry">Participation *</label>
          </div>
          <div className="event-entry-input flex-center">
            <span>
              <input
                className="form-check-input"
                id="freeEntry"
                type="radio"
                name="eventEntry"
                checked={eventEntry === "gratuite"}
                onChange={() => setEventEntry("gratuite")}
              />
              <label htmlFor="admissionFee">gratuite</label>
              <input
                className="form-check-input"
                id="admissionFee"
                type="radio"
                name="eventEntry"
                checked={eventEntry === "payante"}
                onChange={() => setEventEntry("payante")}
              />
              <label htmlFor="online">payante</label>
            </span>
          </div>
          {eventEntry === "payante" && (
            <>
              <div className="event-admissionFee-label flex-center">
                <label htmlFor="admissionFee">Prix d’entrée</label>
              </div>
              <div className="event-admissionFee-input">
                <input
                  name="admissionFee"
                  id="admissionFee"
                  type="number"
                  step="0.01"
                  min="0"
                  max="999.99"
                  placeholder="10.5"
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
        </div>
        <div className="conditions-generales">
          <input
            className="form-check-input"
            id="conditionsCheckbox"
            type="checkbox"
            required
          />
          <label htmlFor="conditionsCheckbox">
            J’ai lu et j’accepte les{" "}
            <Link to="/conditions-generales ">conditions générales</Link>.
          </label>
        </div>
      </form>
      <button onClick={addEvent}>soumettre l’évènement</button>
    </div>
  );
};

export default Profile;
