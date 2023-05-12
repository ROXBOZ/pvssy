import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { EventsContext } from "../../contexts/eventsContext";
import { AuthContext } from "../../contexts/authContext";
import { serverURL } from "../../utilities/serverURL";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  addressRegex,
  cityRegex,
  dateRegex,
  emailRegex,
  isMoreThan3Days,
  swissTelRegex,
  todayISO,
  urlRegex,
} from "../../utilities/regexExpressions";
const AddEvent = () => {
  const formRef = useRef();
  const { userProfile } = useContext(AuthContext);
  const [eventType, setEventType] = useState("offline");
  const [eventIsOneDay, setEventIsOneDay] = useState(true);
  const [eventEntry, setEventEntry] = useState("gratuite");
  const [isUniquePrice, setIsUniquePrice] = useState(true);
  const [organizerIsUserName, setOrganizerIsUserName] = useState(false);
  const [conditionsAccepted, setConditionsAccepted] = useState(null);
  const [message, setMessage] = useState("");
  const { regions } = useContext(EventsContext);
  const [markdown, setMarkdown] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const [newEvent, setNewEvent] = useState({
    isOnline: false,
    eventRegion: "Genève",
    freeEntry: true,
  });

  const newLineCommand = {
    name: "newLine",
    icon: () => <span>↵</span>,
    execute: (opts) => {
      opts.textApi.replaceSelection("  \n");
    },
  };

  const linkCommand = {
    name: "link",
    icon: () => (
      <FontAwesomeIcon
        style={{ opacity: "30%" }}
        className="link-icon"
        icon={faLink}
      />
    ),
    execute: () => {
      console.log("object");
    },
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };
  const handleMdeEditor = (value) => {
    setMarkdown(value);
    setNewEvent({ ...newEvent, eventLongDef: markdown });
  };
  const submitForm = (e) => {
    e.preventDefault();
    userProfile && userProfile.userIsAdmin === true
      ? addNewEvent(false)
      : addNewEvent(true);
  };
  const addNewEvent = async (isPending) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      isPending: isPending,
      title: newEvent.eventTitle,
      dateStart: newEvent.eventDateTimeStart,
      dateEnd: newEvent.eventDateTimeEnd,
      organizer: newEvent.eventOrganizer,
      organizerWebsite: newEvent.eventOrganizerWebsite,
      organizerContact: userProfile.userEmail,
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
        `${serverURL}/api/events/all`,
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
      <form className="grid-form" ref={formRef}>
        <h2>Ajouter un évènement</h2>
        <h3>Informations essentielles</h3>
        <p className="msg info">
          Les entrées marquée d’une astérique <span className="colored">*</span>{" "}
          sont obligatoires .
        </p>
        <div className="form-section">
          <label className="mandatory" htmlFor="eventTitle">
            Nom de l’évènement
          </label>
          <input
            name="eventTitle"
            id="eventTitle"
            type="text"
            placeholder="Nom de l’évènement"
            onChange={handleInputChange}
            required
            className="line"
          />
          {newEvent.eventTitle &&
            (newEvent.eventTitle.length < 3 ||
              newEvent.eventTitle.length > 40) && (
              <p className="msg error">
                Le titre doit contenir entre 3 et 40 caractères.
              </p>
            )}
          <label className="mandatory" htmlFor="eventTitle">
            Durée
          </label>

          <div className="input-label-container">
            <input
              className="form-check-input"
              id="isOneDay"
              type="radio"
              name="eventDuration"
              checked={eventIsOneDay === true}
              onChange={(e) => {
                setEventIsOneDay(true);
                if (e.target.checked) {
                  setNewEvent({ ...newEvent, eventIsOneDay: true });
                }
              }}
            />
            <label htmlFor="isOneDay">Un jour</label>
          </div>
          <div
            style={{
              gridColumn: "span 2",
            }}
            className="input-label-container"
          >
            <input
              className="form-check-input"
              id="isMoreDays"
              type="radio"
              name="eventDuration"
              checked={eventIsOneDay === false}
              onChange={(e) => {
                setEventIsOneDay(false);
                if (e.target.checked) {
                  setNewEvent({ ...newEvent, eventIsOneDay: false });
                }
              }}
            />
            <label htmlFor="isMoreDays">Plusieurs jours</label>
          </div>

          {eventIsOneDay ? (
            <>
              <label className="mandatory" htmlFor="eventDate">
                Date
              </label>
              <input
                name="eventDate"
                id="eventDate"
                type="date"
                onChange={handleInputChange}
                required
                className="line"
              />
              {newEvent.eventDate && newEvent.eventDate < todayISO && (
                <p className="error msg">La date est déjà passée.</p>
              )}
              {newEvent.eventDate &&
                newEvent.eventDate > todayISO &&
                !isMoreThan3Days(newEvent.eventDate) && (
                  <p className="msg warning">
                    L’évènement a lieu dans moins de 3 jours.
                    <br />
                    Nous ne garantissons pas sa publication.
                  </p>
                )}

              <label className="mandatory" htmlFor="eventTimeStart">
                Heure de début
              </label>
              <input
                name="eventTimeStart"
                id="eventTimeStart"
                type="time"
                onChange={handleInputChange}
                required
                className="line"
              />
              <label className="mandatory" htmlFor="eventDateTimeStart">
                Heure de fin
              </label>
              <input
                name="eventTimeEnd"
                id="eventTimeEnd"
                type="time"
                onChange={handleInputChange}
                required
                className="line"
              />
              {newEvent.eventTimeStart &&
                newEvent.eventTimeEnd &&
                newEvent.eventTimeStart >= newEvent.eventTimeEnd && (
                  <p className="error msg">
                    L’heure de début doit être antérieure à l’heure de fin.
                  </p>
                )}
            </>
          ) : (
            <>
              <p className="msg warning">
                Détaillez les horaires pour chaque jour dans « En détails » ou
                créez un événement par journée.
              </p>

              <label className="mandatory" htmlFor="eventDateTimeStart">
                Date de début
              </label>

              <input
                name="eventDateStart"
                id="eventDateStart"
                type="date"
                onChange={handleInputChange}
                required
                className="line"
              />

              {newEvent.eventDateStart &&
                newEvent.eventDateStart < todayISO && (
                  <p className="error msg">La date est déjà passée.</p>
                )}

              <label className="mandatory" htmlFor="eventDateEnd">
                Date de fin
              </label>
              <input
                name="eventDateEnd"
                id="eventDateEnd"
                type="date"
                onChange={handleInputChange}
                className="line"
              />
              {newEvent.eventDateStart &&
                newEvent.eventDateStart > todayISO &&
                !isMoreThan3Days(newEvent.eventDateStart) && (
                  <p className="msg warning">
                    L’évènement commence dans moins de 3 jours.
                    <br />
                    Nous ne garantissons pas sa publication à temps.
                  </p>
                )}

              {newEvent.eventDateStart &&
                newEvent.eventDateEnd &&
                newEvent.eventDateStart > newEvent.eventDateEnd && (
                  <p className="msg warning">
                    La date de fin doit être postérieure à la date de début.
                  </p>
                )}
            </>
          )}

          <label className="mandatory" htmlFor="eventShortDef">
            En bref
          </label>
          <textarea
            name="eventShortDef"
            id="eventShortDef"
            placeholder="Définition 60-120 caractères"
            onChange={handleInputChange}
            required
            rows="2"
            maxLength={121}
          />
          {newEvent.eventShortDef &&
            (newEvent.eventShortDef.length < 60 ||
              newEvent.eventShortDef.length > 120) && (
              <p className="msg error">
                La description doit contenir entre 60 et 120 caractères.
              </p>
            )}
          {!eventIsOneDay && (
            <p className="msg info">Préciser les heures ici  ↓</p>
          )}
          <label htmlFor="eventLongDef">En détails</label>
          <div className="react-mde-container">
            <ReactMde
              commands={{
                newLine: newLineCommand,
                link: linkCommand,
              }}
              toolbarCommands={[["newLine", "bold", "italic", "link"]]}
              name="eventLongDef"
              id="eventLongDef"
              value={markdown}
              onChange={handleMdeEditor}
              newLineOnEnter={true}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
              }
              childProps={{
                writeButton: {
                  tabIndex: -1,
                },
              }}
            />
          </div>

          <label className="mandatory" htmlFor="eventOrganizer">
            Organisé par
          </label>

          {!organizerIsUserName && (
            <>
              <input
                name="eventOrganizer"
                id="eventOrganizer"
                type="text"
                onChange={handleInputChange}
                className="line"
                placeholder="Nom Association organisatrice"
                maxlength="21"
              />
              {newEvent.eventOrganizer &&
                (newEvent.eventOrganizer.length < 3 ||
                  newEvent.eventOrganizer.length > 20) && (
                  <p className="msg error">
                    Le nom doit contenir entre 3 et 20 caractères.
                  </p>
                )}
              <label htmlFor="eventOrganizerWebsite">Site Internet</label>
              <input
                name="eventOrganizerWebsite"
                id="eventOrganizerWebsite"
                type="text"
                onChange={handleInputChange}
                className="line"
                placeholder="https://..."
              />
            </>
          )}

          {!organizerIsUserName &&
            newEvent.eventOrganizerWebsite &&
            !urlRegex.test(newEvent.eventOrganizerWebsite) && (
              <p className="msg error">
                L’URL doit commencer par https:// ou http:// et être valide.
              </p>
            )}

          {userProfile && (
            <div
              className="input-label-container"
              style={{ gridColumn: "6", whiteSpace: "nowrap" }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                name="eventOrganizer"
                onChange={(e) => {
                  if (e.target.checked) {
                    setOrganizerIsUserName(true);
                    setNewEvent({
                      ...newEvent,
                      eventOrganizer: userProfile.userName,
                      eventOrganizerWebsite: userProfile.userWebsite,
                    });
                  } else {
                    setOrganizerIsUserName(false);
                    setNewEvent({
                      ...newEvent,
                      eventOrganizer: null,
                      eventOrganizerWebsite: null,
                    });
                  }
                }}
              />
              <label htmlFor="eventOrganizer">
                <a href={`http://${userProfile.userWebsite}`}>
                  {userProfile.userName}
                </a>
              </label>
            </div>
          )}
        </div>
        <h3>Format</h3>
        <div className="form-section">
          <label className="mandatory" htmlFor="eventType">
            Format
          </label>

          <div className="input-label-container">
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
          </div>
          <div className="input-label-container">
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
            <label htmlFor="offline">Sur place</label>
          </div>
          {eventType === "offline" && (
            <>
              <label className="mandatory" htmlFor="eventAddress">
                Adresse
              </label>
              <input
                name="eventAddress"
                id="eventAddress"
                type="text"
                placeholder="Rue, numéro"
                onChange={handleInputChange}
                required
                className="line"
              />
              {!newEvent.isOnline &&
                newEvent.eventAddress &&
                !addressRegex.test(newEvent.eventAddress) && (
                  <p className="msg error">
                    L’adresse doit inclure la rue et le numéro.
                  </p>
                )}
              <label className="mandatory" htmlFor="eventCity">
                Lieu
              </label>
              <input
                name="eventCity"
                id="eventCity"
                type="text"
                placeholder="ZIP, Lieu"
                onChange={handleInputChange}
                required
                className="line"
              />
              {!newEvent.isOnline &&
                newEvent.eventCity &&
                !cityRegex.test(newEvent.eventCity) && (
                  <p className="msg error">
                    Le lieu doit inclure le code postale (4 chiffres) et la
                    ville.
                  </p>
                )}

              <label className="mandatory" htmlFor="eventRegion">
                Canton
              </label>

              <select
                name="eventRegion"
                id="eventRegion"
                onChange={handleInputChange}
                className="line"
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
            </>
          )}

          {eventType === "online" && (
            <>
              <label className="mandatory" htmlFor="onlineMeeting">
                Lien réunion
              </label>
              <input
                name="onlineMeeting"
                id="onlineMeeting"
                type="text"
                placeholder="https://..."
                onChange={handleInputChange}
                required
                className="line"
              />
            </>
          )}
          {newEvent.isOnline &&
            newEvent.onlineMeeting &&
            !urlRegex.test(newEvent.onlineMeeting) && (
              <p className="msg error">
                L’URL doit commencer par https:// ou http:// et être valide.
              </p>
            )}
        </div>
        <h3>Réservations</h3>
        <div className="form-section">
          <label htmlFor="eventTel">Téléphone</label>
          <input
            name="eventTel"
            id="eventTel"
            type="tel"
            placeholder="+41(0)..."
            onChange={handleInputChange}
            className="line"
          />

          {newEvent.eventTel && !swissTelRegex.test(newEvent.eventTel) && (
            <p className="msg error">
              Il ne s’agit pas d’un numéro suisse valide.
            </p>
          )}

          <label htmlFor="eventTel">Adresse Email</label>
          <input
            name="eventEmail"
            id="eventEmail"
            type="text"
            placeholder="info@..."
            onChange={handleInputChange}
            className="line"
          />
          {newEvent.eventEmail && !emailRegex.test(newEvent.eventEmail) && (
            <p className="msg error">L'adresse e-mail est invalide.</p>
          )}
        </div>
        <h3>Tarif d’entrée / participation</h3>
        <div className="form-section">
          <label className="mandatory" htmlFor="eventEntry">
            Entrée / participation
          </label>
          <div className="input-label-container">
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
          </div>
          <div className="input-label-container">
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
          </div>

          {eventEntry === "payante" && (
            <>
              <label className="mandatory" htmlFor="eventEntry">
                Type de tarification
              </label>
              <div className="input-label-container">
                <input
                  className="form-check-input"
                  id="eventPriceRange"
                  type="radio"
                  name="eventPrice"
                  checked={isUniquePrice === false}
                  onChange={(e) => {
                    setIsUniquePrice(false);
                    if (e.target.checked) {
                      setNewEvent({ ...newEvent, isUniquePrice: false });
                    }
                  }}
                />
                <label htmlFor="eventPriceRange">Fourchette</label>
              </div>
              <div
                style={{
                  gridColumn: "span 2",
                }}
                className="input-label-container"
              >
                <input
                  className="form-check-input"
                  id="eventUniquePrice"
                  type="radio"
                  name="eventPrice"
                  checked={isUniquePrice === true}
                  onChange={(e) => {
                    setIsUniquePrice(true);
                    if (e.target.checked) {
                      setNewEvent({ ...newEvent, isUniquePrice: true });
                    }
                  }}
                />
                <label htmlFor="eventUniquePrice">Tarif unique</label>
              </div>

              {isUniquePrice ? (
                <>
                  <label className="mandatory" htmlFor="admissionFee">
                    Tarif en CHF
                  </label>
                  <input
                    name="admissionFee"
                    id="admissionFee"
                    type="number"
                    placeholder="25,50"
                    onChange={handleInputChange}
                    required
                    className="line"
                  />
                </>
              ) : (
                <>
                  <label className="mandatory" htmlFor="admissionFee">
                    Tarif minimum en CHF
                  </label>
                  <input
                    name="admissionFee"
                    id="admissionFee"
                    type="number"
                    placeholder="10"
                    onChange={handleInputChange}
                    required
                    className="line"
                  />
                  <label className="mandatory" htmlFor="admissionFee">
                    Tarif maximum en CHF
                  </label>
                  <input
                    name="admissionFee"
                    id="admissionFee"
                    type="number"
                    placeholder="20"
                    onChange={handleInputChange}
                    required
                    className="line"
                  />
                  <p className="msg info">
                    Préciser les infos relatives aux prix dans « En détails ».
                  </p>
                </>
              )}
            </>
          )}
          {newEvent.freeEntry === false && !newEvent.admissionFee && (
            <p className="error msg">
              Renseigner un chiffre ou sélectionner « gratuite ».
            </p>
          )}
        </div>

        {userProfile && userProfile.userIsAdmin === false && (
          <div className="conditions-generales">
            <br />
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
      <div className="flex-center">
        <button
          onClick={submitForm}
          type="submit"
          disabled={
            !(
              (newEvent.eventTitle &&
              newEvent.eventTitle.length >= 3 &&
              newEvent.eventTitle.length < 40 &&
              newEvent.eventIsOneDay
                ? newEvent.eventDate &&
                  newEvent.eventDate > todayISO &&
                  newEvent.eventTimeStart &&
                  newEvent.eventTimeEnd &&
                  newEvent.eventTimeStart < newEvent.eventTimeEnd
                : newEvent.eventDateStart &&
                  newEvent.eventDateStart > todayISO &&
                  newEvent.eventDateEnd &&
                  newEvent.eventDateStart < newEvent.eventDateEnd) &&
              newEvent.eventShortDef &&
              newEvent.eventShortDef.length > 60 &&
              newEvent.eventShortDef.length < 120 &&
              newEvent.eventOrganizer &&
              newEvent.eventOrganizer.length > 3 &&
              newEvent.eventOrganizer.length < 20 &&
              newEvent.eventOrganizerWebsite &&
              urlRegex.test(newEvent.eventOrganizerWebsite) &&
              (newEvent.isOnline
                ? newEvent.onlineMeeting &&
                  urlRegex.test(newEvent.onlineMeeting)
                : newEvent.eventAddress &&
                  addressRegex.test(newEvent.eventAddress) &&
                  newEvent.eventCity &&
                  cityRegex.test(newEvent.eventCity)) &&
              newEvent.eventTel &&
              swissTelRegex.test(newEvent.eventTel) &&
              newEvent.eventEmail &&
              emailRegex.test(newEvent.eventEmail) &&
              // (newEvent.freeEntry ? true : newEvent.admissionFee) &&
              (userProfile && userProfile.userIsAdmin
                ? true
                : conditionsAccepted)
            )
          }
        >
          {userProfile && userProfile.userIsAdmin === true
            ? "Ajouter l’évènement"
            : "Proposer l’évènement"}
        </button>

        {/* <button
          onClick={submitForm}
          type="submit"
          disabled={
            !(newEvent.eventTitle &&
            newEvent.eventTitle.length > 3 &&
            newEvent.eventTitle.length < 40 &&
            newEvent.eventDate &&
            newEvent.eventDate > todayISO &&
            newEvent.eventDateStart &&
            newEvent.eventDateStart > todayISO &&
            newEvent.eventDateStart &&
            newEvent.eventDateEnd &&
            newEvent.eventDateStart < newEvent.eventDateEnd &&
            newEvent.eventShortDef &&
            newEvent.eventShortDef.length > 60 &&
            newEvent.eventShortDef.length < 200 &&
            newEvent.eventOrganizer &&
            (newEvent.isOnline
              ? newEvent.onlineMeeting && urlRegex.test(newEvent.onlineMeeting)
              : newEvent.eventAddress &&
                addressRegex.test(newEvent.eventAddress) &&
                newEvent.eventCity &&
                cityRegex.test(newEvent.eventCity)) &&
            (newEvent.eventTel
              ? swissTelRegex.test(newEvent.eventTel)
              : true) &&
            (newEvent.eventEmail
              ? emailRegex.test(newEvent.eventEmail)
              : true) &&
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
        </button> */}
        {message && (
          <div className={`message ${message.type}`}>{message.content}</div>
        )}
      </div>
    </>
  );
};

export default AddEvent;
