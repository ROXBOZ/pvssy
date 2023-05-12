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
  emailRegex,
  isMoreThan3Days,
  swissTelRegex,
  todayISO,
  urlRegex,
} from "../../utilities/regexExpressions";

const AddEvent = () => {
  const formRef = useRef();
  const { userProfile } = useContext(AuthContext);
  const [isOnline, setIsOnline] = useState(false);
  const [eventIsOneDay, setEventIsOneDay] = useState(true);
  const [isFreeEntry, setIsFreeEntry] = useState(true);
  const [isUniquePrice, setIsUniquePrice] = useState(true);
  const [organizerIsUserName, setOrganizerIsUserName] = useState(false);
  const [setConditionsAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const { regions } = useContext(EventsContext);
  const [markdown, setMarkdown] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const [newEvent, setNewEvent] = useState({
    isOnline: false,
    eventIsOneDay: true,
    eventRegion: "Genève",
    isFreeEntry: true,
    isUniquePrice: true,
    conditionsAccepted: false,
  });

  // react-mde
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
  const handleMdeEditor = (value) => {
    setMarkdown(value);
    setNewEvent({ ...newEvent, eventLongDef: markdown });
  };
  // end react-mde

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // userIsAdmin ? !isPending : isPending
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
      eventIsOneDay: newEvent.eventIsOneDay,
      eventDateStart: newEvent.eventDateStart,
      eventDateEnd: !eventIsOneDay ? newEvent.eventDateEnd : null,
      eventTimeStart: eventIsOneDay ? newEvent.eventTimeStart : null,
      eventTimeEnd: eventIsOneDay ? newEvent.eventTimeEnd : null,
      organizer: newEvent.eventOrganizer,
      organizerWebsite: newEvent.eventOrganizerWebsite,
      organizerContact: userProfile.userEmail,
      shortDef: newEvent.eventShortDef,
      longDef: newEvent.eventLongDef,
      isOnline: isOnline ? true : false,
      onlineMeeting: isOnline ? newEvent.onlineMeeting : null,
      address: isOnline ? null : newEvent.eventAddress,
      city: isOnline ? null : newEvent.eventCity,
      region: newEvent.eventRegion,
      email: newEvent.eventEmail,
      tel: newEvent.eventTel,
      isFreeEntry: newEvent.isFreeEntry,
      admissionFeeMin: !isFreeEntry && newEvent.admissionFeeMin,
      admissionFeeMax:
        !isFreeEntry && !isUniquePrice ? newEvent.admissionFeeMax : null,
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
      if (!result.error) {
        setMessage({
          type: "success",
          content: (
            <p className="msg success">L’évènement a été livré avec succès!</p>
          ),
        });
      } else {
        setMessage({
          type: "error",
          content: (
            <p className="msg error">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          ),
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("newEvent :", newEvent);

  useEffect(() => {
    if (message && message.type === "success") {
      setNewEvent({
        isOnline: false,
        eventIsOneDay: true,
        eventRegion: "Genève",
        isFreeEntry: true,
        isUniquePrice: true,
        conditionsAccepted: false,
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
        <p className="msg info">
          <span>
            Les entrées marquée d’une astérisque sont{" "}
            <span className="colored">*</span> obligatoires.
          </span>
        </p>
        <h3>Informations essentielles</h3>

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
            // required
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
            <label className="radio-label" htmlFor="isOneDay">
              Un jour
            </label>
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
            <label className="radio-label" htmlFor="isMoreDays">
              Plusieurs jours
            </label>
          </div>

          {eventIsOneDay ? (
            <>
              <label className="mandatory" htmlFor="eventSingleDate">
                Date
              </label>
              <input
                name="eventDateStart"
                id="eventSingleDate"
                type="date"
                onChange={handleInputChange}
                // required
                className="line"
              />
              {newEvent.eventDateStart &&
                newEvent.eventDateStart < todayISO && (
                  <p className="error msg">La date est déjà passée.</p>
                )}

              {userProfile &&
                !userProfile.userIsAdmin &&
                newEvent.eventDateStart &&
                newEvent.eventDateStart > todayISO &&
                !isMoreThan3Days(newEvent.eventDateStart) && (
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
                // required
                className="line"
              />
              <label className="mandatory" htmlFor="eventTimeEnd">
                Heure de fin
              </label>
              <input
                name="eventTimeEnd"
                id="eventTimeEnd"
                type="time"
                onChange={handleInputChange}
                // required
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
                // required
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
            // required
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
                maxLength="21"
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
                L’URL doit commencer par https:// ou http:// ou www. et être
                valide.
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

              <label className="radio-label" htmlFor="eventOrganizer">
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
              id="offline"
              type="radio"
              name="eventType"
              checked={isOnline === false}
              onChange={(e) => {
                setIsOnline(false);
                if (e.target.checked) {
                  setNewEvent({ ...newEvent, isOnline: false });
                }
              }}
            />
            <label className="radio-label" htmlFor="offline">
              Sur place
            </label>
          </div>

          <div className="input-label-container">
            <input
              className="form-check-input"
              id="online"
              type="radio"
              name="eventType"
              checked={isOnline === true}
              onChange={(e) => {
                setIsOnline(true);
                if (e.target.checked) {
                  setNewEvent({ ...newEvent, isOnline: true });
                }
              }}
            />
            <label className="radio-label" htmlFor="online">
              Online
            </label>
          </div>

          {!isOnline && (
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
                // required
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
                // required
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

          {isOnline && (
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
                // required
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
              name="isFreeEntry"
              checked={isFreeEntry === true}
              onChange={(e) => {
                setIsFreeEntry(true);
                if (e.target.checked) {
                  setNewEvent({ ...newEvent, isFreeEntry: true });
                }
              }}
            />
            <label className="radio-label" htmlFor="freeEntry">
              gratuite
            </label>
          </div>
          <div className="input-label-container">
            <input
              className="form-check-input"
              id="paidEntry"
              type="radio"
              name="isFreeEntry"
              checked={isFreeEntry === false}
              onChange={(e) => {
                setIsFreeEntry(false);
                if (e.target.checked) {
                  setNewEvent({ ...newEvent, isFreeEntry: false });
                }
              }}
            />
            <label className="radio-label" htmlFor="paidEntry">
              payante
            </label>
          </div>

          {isFreeEntry === false && (
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
                <label className="radio-label" htmlFor="eventPriceRange">
                  Fourchette
                </label>
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
                      setNewEvent({
                        ...newEvent,
                        isUniquePrice: true,
                      });
                    }
                  }}
                />
                <label className="radio-label" htmlFor="eventUniquePrice">
                  Tarif unique
                </label>
              </div>

              {isUniquePrice ? (
                <>
                  <label className="mandatory" htmlFor="admissionFeeUnique">
                    Tarif en CHF
                  </label>
                  <input
                    name="admissionFeeMin"
                    id="admissionFeeUnique"
                    type="number"
                    placeholder="25,50"
                    onChange={handleInputChange}
                    // required
                    className="line"
                  />
                </>
              ) : (
                <>
                  <label className="mandatory" htmlFor="admissionFeeMin">
                    Tarif minimum en CHF
                  </label>
                  <input
                    name="admissionFeeMin"
                    id="admissionFeeMin"
                    type="number"
                    placeholder="10"
                    onChange={handleInputChange}
                    // required
                    className="line"
                  />
                  <label className="mandatory" htmlFor="admissionFeeMax">
                    Tarif maximum en CHF
                  </label>
                  <input
                    name="admissionFeeMax"
                    id="admissionFeeMax"
                    type="number"
                    placeholder="20"
                    onChange={handleInputChange}
                    // required
                    className="line"
                  />

                  {console.log(
                    "newEvent.admissionFeeMin ",
                    newEvent.admissionFeeMin
                  )}

                  {console.log(
                    "newEvent.admissionFeeMax ",
                    newEvent.admissionFeeMax
                  )}

                  {newEvent.admissionFeeMin &&
                    newEvent.admissionFeeMax &&
                    newEvent.admissionFeeMin > newEvent.admissionFeeMax && (
                      <p className="msg error">
                        Le prix maxium doit être supérieur au prix minimum.
                      </p>
                    )}

                  <p className="msg info">
                    Détailler la fourchette de prix dans « En détails ».
                  </p>
                </>
              )}
            </>
          )}
          {newEvent.freeEntry === false && !newEvent.admissionFeeMin && (
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
              onChange={(e) => {
                setConditionsAccepted(true);
                if (e.target.checked) {
                  setNewEvent({ ...newEvent, conditionsAccepted: true });
                } else {
                  setNewEvent({ ...newEvent, conditionsAccepted: false });
                }
              }}
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
              ((newEvent.eventTitle &&
              newEvent.eventTitle.length >= 3 &&
              newEvent.eventTitle.length < 40 &&
              (newEvent.eventIsOneDay
                ? newEvent.eventDateStart &&
                  newEvent.eventDateStart > todayISO &&
                  newEvent.eventTimeStart &&
                  newEvent.eventTimeEnd &&
                  newEvent.eventTimeStart < newEvent.eventTimeEnd
                : newEvent.eventDateStart &&
                  newEvent.eventDateStart > todayISO &&
                  newEvent.eventDateEnd &&
                  newEvent.eventDateStart < newEvent.eventDateEnd) &&
              newEvent.eventShortDef &&
              newEvent.eventShortDef.length >= 60 &&
              newEvent.eventShortDef.length <= 120 &&
              newEvent.eventOrganizer &&
              newEvent.eventOrganizer.length >= 3 &&
              newEvent.eventOrganizer.length <= 20 &&
              (!newEvent.eventOrganizerWebsite ||
                urlRegex.test(newEvent.eventOrganizerWebsite)) &&
              newEvent.isOnline
                ? newEvent.onlineMeeting &&
                  urlRegex.test(newEvent.onlineMeeting)
                : newEvent.eventAddress &&
                  addressRegex.test(newEvent.eventAddress) &&
                  newEvent.eventCity &&
                  cityRegex.test(newEvent.eventCity) &&
                  (!newEvent.eventTel ||
                    swissTelRegex.test(newEvent.eventTel)) &&
                  (!newEvent.eventEmail ||
                    emailRegex.test(newEvent.eventEmail))) &&
              newEvent.isFreeEntry
                ? true
                : isUniquePrice
                ? newEvent.admissionFee
                : newEvent.admissionFeeMin && newEvent.admissionFeeMax) &&
              (userProfile.userIsAdmin || newEvent.conditionsAccepted)
            )
          }
        >
          {userProfile && userProfile.userIsAdmin === true
            ? "Ajouter l’évènement"
            : "Proposer l’évènement"}
        </button>

        {userProfile && userProfile.userIsAdmin === false && (
          <p className="msg info">
            <span>
              Si ton évènement n’a pas été traité après 3 jours, contacte-nous à{" "}
              <a
                style={{ whiteSpace: "nowrap" }}
                href="mailto:hello@pvssy-talk.org"
              >
                hello@pvssy-talk.org
              </a>
              .
            </span>
          </p>
        )}

        {message && (
          <div className={`message ${message.type}`}>{message.content}</div>
        )}
      </div>
    </>
  );
};

export default AddEvent;
