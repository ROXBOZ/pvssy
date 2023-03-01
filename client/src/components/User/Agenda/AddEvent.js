import React from "react";
import { Link } from "react-router-dom";
import { EventsContext } from "../../../contexts/eventsContext";
import { AuthContext } from "../../../contexts/authContext";
import { useState, useContext } from "react";

const AddEvent = () => {
  const { userProfile } = useContext(AuthContext);
  const [eventType, setEventType] = useState("offline");
  const [eventEntry, setEventEntry] = useState("gratuite");
  const [newEvent, setNewEvent] = useState({
    isOnline: false,
    freeEntry: true,
  });

  const addApprovedEvent = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      isPending: false,
      title: newEvent.eventTitle,
      date: newEvent.eventDateTime,
      organizer: userProfile.userName,
      organizerContact: userProfile.userEmail,
      organizerWebsite: userProfile.userWebsite,
      shortDef: newEvent.eventShortDef,
      longDef: newEvent.eventLongDef,
      isOnline: eventType === "online" ? true : false,
      onlineMeeting: eventType === "online" ? newEvent.onlineMeeting : null,
      address: eventType === "online" ? null : newEvent.eventAddress,
      city: eventType === "online" ? null : newEvent.eventCity,
      region: newEvent.eventRegion,
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
      const result = await response.json();
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const addPendingEvent = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      isPending: true,
      title: newEvent.eventTitle,
      date: newEvent.eventDateTime,
      organizer: userProfile.userName,
      organizerContact: userProfile.userEmail,
      organizerWebsite: userProfile.userWebsite,
      shortDef: newEvent.eventShortDef,
      longDef: newEvent.eventLongDef,
      isOnline: eventType === "online" ? true : false,
      onlineMeeting: eventType === "online" ? newEvent.onlineMeeting : null,
      address: eventType === "online" ? null : newEvent.eventAddress,
      city: eventType === "online" ? null : newEvent.eventCity,
      region: newEvent.eventRegion,
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
  const submitForm = (e) => {
    e.preventDefault();
    if (!newEvent.eventTitle) {
      alert("Titre manquant");
    } else if (!newEvent.eventDateTime) {
      alert("Date et/ou heure manquante");
    } else if (!newEvent.eventShortDef) {
      alert("Description 'En bref' manquante");
    } else if (newEvent.isOnline === true && !newEvent.onlineMeeting) {
      alert("Lien manquant pour la réunion en ligne");
    } else if (newEvent.isOnline === false && !newEvent.eventAddress) {
      alert("Rue et numéro manquants");
    } else if (newEvent.isOnline === false && !newEvent.eventCity) {
      alert("Ville manquante");
    } else if (newEvent.isOnline === false && !newEvent.eventRegion) {
      alert("Région manquante");
    } else if (newEvent.freeEntry === false && !newEvent.entryFee) {
      alert("Prix manquant");
    } else {
      userProfile && userProfile.userIsAdmin === true
        ? addApprovedEvent()
        : addPendingEvent();
    }
  };

  // const { regions } = useContext(EventsContext);
  // const [eventRegion, setEventRegion] = useState(null);
  // const [suggestions, setSuggestions] = useState([]);
  // const [showSuggestions, setShowSuggestions] = useState(false);
  // const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  // ADD EVENTS

  // REVIEW Region Dropdown context??? not repeat with agenda
  // const handleInputRegionChange = (event) => {
  //   const region = event.target.value;

  //   if (region.length === 0) {
  //     setSuggestions([]);
  //     setShowSuggestions(false);
  //     return;
  //   }

  //   const matchingSuggestions = regions.filter((suggestion) =>
  //     suggestion.toLowerCase().includes(region.toLowerCase())
  //   );
  //   setSuggestions(matchingSuggestions);
  //   setShowSuggestions(matchingSuggestions.length > 0);
  // };
  // const handleSuggestionClick = (suggestion) => {
  //   setEventRegion(suggestion);

  //   setShowSuggestions(false);
  // };
  // const handleKeyDown = (e) => {
  //   if (e.key === "ArrowDown") {
  //     e.preventDefault();
  //     setSelectedSuggestionIndex(
  //       (selectedSuggestionIndex + 1) % suggestions.length
  //     );
  //   } else if (e.key === "ArrowUp") {
  //     e.preventDefault();
  //     setSelectedSuggestionIndex(
  //       (selectedSuggestionIndex - 1 + suggestions.length) % suggestions.length
  //     );
  //   } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
  //     handleSuggestionClick(suggestions[selectedSuggestionIndex]);
  //   }
  // };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  return (
    <>
      {userProfile && userProfile.userIsAdmin === true ? (
        <>
          <h1>
            Ajouter un évènement<sup>prototype</sup>
          </h1>
          <p className="warning msg">
            L’évènement sera ajouté immédiatement au calendrier.
          </p>
        </>
      ) : (
        <>
          <h1>
            Proposer un évènement<sup>prototype</sup>
          </h1>
          <p className="warning msg">
            Nous ne pouvons pas garantir la publication d'un événement qui
            aurait lieu moins de trois jours après sa soumission.
          </p>
        </>
      )}

      <form className="grid-form">
        <h2>Formulaire à compléter</h2>
        <div className="form-section">
          <h3>Informations essentielles</h3>
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
                onChange={(e) => {
                  setEventType("online");
                  if (e.target.checked) {
                    setNewEvent({ ...newEvent, isOnline: true });
                  }
                }}
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
                onChange={(e) => {
                  setEventType("offline");
                  if (e.target.checked) {
                    setNewEvent({ ...newEvent, isOnline: false });
                  }
                }}
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
                  // value={eventRegion}
                  // onChange={handleInputRegionChange}
                  onChange={handleInputChange}
                  // onKeyDown={handleKeyDown}
                  // required
                />
              </div>
              {/* {showSuggestions && (
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
              )} */}
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
            S’il n’est pas possible de faire de réservations, laisser les champs
            libre.
          </p>
          <div className="event-tel-label flex-center">
            <label htmlFor="eventTel">Téléphone</label>
          </div>
          <div className="event-tel-input">
            <input
              name="eventTel"
              id="eventTel"
              type="tel"
              // pattern="\+\d{2}\(\d\)\d{2}\s\d{3}\s\d{2}\s\d{2}"
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
              placeholder="info@..."
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-section">
          <h3>Entrées</h3>
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
                onChange={(e) => {
                  setEventEntry("gratuite");
                  if (e.target.checked) {
                    setNewEvent({ ...newEvent, freeEntry: true });
                  }
                }}
              />
              <label htmlFor="admissionFee">gratuite</label>
              <input
                className="form-check-input"
                id="admissionFee"
                type="radio"
                name="eventEntry"
                checked={eventEntry === "payante"}
                onChange={(e) => {
                  setEventEntry("payante");
                  if (e.target.checked) {
                    setNewEvent({ ...newEvent, freeEntry: false });
                  }
                }}
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
                  required
                />
              </div>
            </>
          )}
        </div>

        {userProfile && userProfile.userIsAdmin === false && (
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
        )}
      </form>

      {userProfile && userProfile.userIsAdmin === true ? (
        <>
          <button onClick={submitForm}>Ajouter au calendrier</button>

          {/* <p className="success msg">L’évènement a été ajouté au calendrier.</p> */}
        </>
      ) : (
        <>
          <button onClick={submitForm}>Proposer l’évènement</button>
        </>
      )}
    </>
  );
};

export default AddEvent;
