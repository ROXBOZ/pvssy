import React from "react";

const AddEvent = () => {
  return (
    <div>
      <form>
        <div>
          <h1>Ajouter un évènement</h1>
          {/* <label htmlFor="eventName">Nom de l’évènement </label>
          <input name="event-name" id="eventName" type="text" />

          <label htmlFor="eventDate">Date de l’évènement </label>
          <input name="event-date" id="eventDate" type="date" /> */}
          <label htmlFor="avatar">Choose a profile picture</label>
          <input type="file" id="avatar" name="avatar"></input>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
