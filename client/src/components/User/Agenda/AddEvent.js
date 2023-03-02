import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { EventsContext } from "../../../contexts/eventsContext";
import { AuthContext } from "../../../contexts/authContext";

import {
  addressRegex,
  cityRegex,
  dateRegex,
  emailRegex,
  isMoreThan3Days,
  swissTelRegex,
  todayISO,
  urlRegex,
} from "../../../utils/regexExpressions";

const AddEvent = () => {
  const { userProfile } = useContext(AuthContext);
  const [eventType, setEventType] = useState("offline");
  const [eventEntry, setEventEntry] = useState("gratuite");
  const [conditionsAccepted, setConditionsAccepted] = useState(null);
  const [message, setMessage] = useState("");
  const { regions } = useContext(EventsContext);
  const formRef = useRef();
  const [newEvent, setNewEvent] = useState({
    isOnline: false,
    eventRegion: "Genève",
    freeEntry: true,
  });

  const addNewEvent = async (isPending) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      isPending: isPending,
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
      setMessage({
        type: "success",
        content: (
          <p className="msg success">L’évènement a été livré avec succès!</p>
        ),
      });
    } catch (error) {
      console.log("error", error);
      setMessage({
        type: "error",
        content: (
          <p className="msg error">
            Une erreur est survenue. Veuillez réessayer.
          </p>
        ),
      });
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
      alert("Lieu manquante");
    } else if (newEvent.freeEntry === false && !newEvent.admissionFee) {
      alert("Prix manquant");
    } else {
      userProfile && userProfile.userIsAdmin === true
        ? addNewEvent(false)
        : addNewEvent(true);
    }
  };
  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (message && message.type === "success") {
      setNewEvent({
        isOnline: false,
        eventRegion: "Genève",
        freeEntry: true,
      });
      formRef.current.reset();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 3000);
    }
  }, [message]);

  return (
    <>
      {userProfile && userProfile.userIsAdmin === true ? (
        <>
          <h1>
            Ajouter un évènement<sup>prototype</sup>
          </h1>
          <p className="reminder msg">
            L’évènement sera ajouté immédiatement au calendrier. Les évènements
            marqués d’une astérisque (*) sont obligatoires.
          </p>
        </>
      ) : (
        <>
          <h1>
            Proposer un évènement<sup>prototype</sup>
          </h1>
          <p className="reminder msg">
            Les évènements marqués d’une astérisque (*) sont obligatoires.
          </p>
        </>
      )}

      <form className="grid-form" ref={formRef}>
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
              placeholder="Veuillez entrer une définition de l'événement courte et concise de max. 120 caractères."
              onChange={handleInputChange}
              maxlength="120"
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
                <label htmlFor="eventRegion">Agglomération *</label>
              </div>
              <div className="event-region-input">
                <select
                  name="eventRegion"
                  id="eventRegion"
                  onChange={handleInputChange}
                  selected="Genève"
                >
                  {regions &&
                    regions.map((region) => {
                      return (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      );
                    })}
                </select>
              </div>
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

          <div className="event-tel-label flex-center">
            <label htmlFor="eventTel">Téléphone</label>
          </div>
          <div className="event-tel-input">
            <input
              name="eventTel"
              id="eventTel"
              type="tel"
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
          <h3>Prix</h3>
          <div className="event-entry-label flex-center">
            <label htmlFor="eventEntry">Entrée / participation *</label>
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

        <ul className="error-list">
          {newEvent.eventDateTime &&
            newEvent.eventDateTime > todayISO &&
            !isMoreThan3Days(newEvent.eventDateTime) && (
              <p className="msg warning">
                L’évènement a lieu dans moins de 3 jours. Nous ne garantissons
                pas sa publication.
              </p>
            )}
          {newEvent.eventTitle &&
            (newEvent.eventTitle.length < 3 ||
              newEvent.eventTitle.length > 40) && (
              <li>Le titre doit contenir entre 3 et 40 caractères.</li>
            )}
          {newEvent.eventDateTime && newEvent.eventDateTime < todayISO && (
            <li>La date est déjà passée.</li>
          )}
          {newEvent.eventDateTime &&
            !dateRegex.test(newEvent.eventDateTime) && (
              <li>La date est invalide.</li>
            )}
          {newEvent.eventShortDef &&
            (newEvent.eventShortDef.length < 60 ||
              newEvent.eventShortDef.length > 200) && (
              <li>
                La description brève doit contenir entre 60 et 200 caractères.
              </li>
            )}
          {newEvent.isOnline &&
            newEvent.onlineMeeting &&
            !urlRegex.test(newEvent.onlineMeeting) && (
              <li>L’URL de la réunion n’est pas valide.</li>
            )}
          {!newEvent.isOnline &&
            ((newEvent.eventAddress &&
              !addressRegex.test(newEvent.eventAddress)) ||
              (newEvent.eventCity && !cityRegex.test(newEvent.eventCity))) && (
              <li>
                Le format de l'adresse ou du lieu est invalide. L’adresse doit
                inclure la rue et le numéro, le lieu doit inclure le code postal
                et la commune.{" "}
              </li>
            )}
          {newEvent.eventTel && !swissTelRegex.test(newEvent.eventTel) && (
            <li>
              Le numéro de téléphone doit être suisse au format international :
              +41 (0) ...
            </li>
          )}
          {newEvent.eventEmail && !emailRegex.test(newEvent.eventEmail) && (
            <li>L'adresse e-mail est invalide.</li>
          )}
          {newEvent.freeEntry === false && !newEvent.admissionFee && (
            <li>
              Veuillez renseigner un prix ou sélectionner l'option "Gratuit".
            </li>
          )}
        </ul>

        {userProfile && userProfile.userIsAdmin === false && (
          <div className="conditions-generales">
            <input
              className="form-check-input"
              id="conditionsCheckbox"
              type="checkbox"
              onChange={(e) => setConditionsAccepted(e.target.checked)}
              required
            />
            <label htmlFor="conditionsCheckbox">
              J’ai lu et j’accepte les{" "}
              <Link to="/conditions-generales ">conditions générales</Link>.
            </label>
          </div>
        )}
      </form>

      <button
        onClick={submitForm}
        type="submit"
        disabled={
          !(newEvent.eventTitle &&
          newEvent.eventTitle.length > 3 &&
          newEvent.eventTitle.length < 40 &&
          newEvent.eventDateTime &&
          newEvent.eventDateTime > todayISO &&
          dateRegex.test(newEvent.eventDateTime) &&
          newEvent.eventShortDef &&
          newEvent.eventShortDef.length > 60 &&
          newEvent.eventShortDef.length < 200 &&
          (newEvent.isOnline
            ? newEvent.onlineMeeting && urlRegex.test(newEvent.onlineMeeting)
            : newEvent.eventAddress &&
              addressRegex.test(newEvent.eventAddress) &&
              newEvent.eventCity &&
              cityRegex.test(newEvent.eventCity)) &&
          (newEvent.eventTel ? swissTelRegex.test(newEvent.eventTel) : true) &&
          (newEvent.eventEmail ? emailRegex.test(newEvent.eventEmail) : true) &&
          (newEvent.freeEntry ? true : newEvent.admissionFee) &&
          userProfile &&
          userProfile.userIsAdmin
            ? true
            : conditionsAccepted)
        }
      >
        {userProfile && userProfile.userIsAdmin === true
          ? "Ajouter l’évènement"
          : "Proposer l’évènement"}
      </button>

      {userProfile && userProfile.userIsAdmin === false && message && (
        <div className={`message ${message.type}`}>{message.content}</div>
      )}
    </>
  );
};

export default AddEvent;
