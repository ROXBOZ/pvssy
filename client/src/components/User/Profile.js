import { AuthContext } from "../../contexts/authContext";
import UserDashboard from "./UserDashboard";
import { useContext, useState } from "react";
import AddEvent from "../AddEvent";

const Profile = () => {
  const { userProfile } = useContext(AuthContext);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showModifyEvent, setShowModifyEvent] = useState(false);
  const [showDeleteEvent, setShowDeleteEvent] = useState(false);

  const handleEventClick = (eventType) => {
    switch (eventType) {
      case "add":
        setShowAddEvent(true);
        setShowModifyEvent(false);
        setShowDeleteEvent(false);
        break;
      case "modify":
        setShowAddEvent(false);
        setShowModifyEvent(true);
        setShowDeleteEvent(false);
        break;
      case "delete":
        setShowAddEvent(false);
        setShowModifyEvent(false);
        setShowDeleteEvent(true);
        break;
      default:
        setShowAddEvent(false);
        setShowModifyEvent(false);
        setShowDeleteEvent(false);
    }
  };

  return (
    <div>
      <UserDashboard />

      <div className="action-container">
        <button
          className="action-button"
          onClick={() => handleEventClick("add")}
        >
          {userProfile && userProfile.userIsAdmin === true ? (
            <span>Ajouter</span>
          ) : (
            <span>Proposer</span>
          )}{" "}
          un évènement
        </button>
        {userProfile && userProfile.userIsAdmin === true && (
          <button
            className="action-button"
            onClick={() => handleEventClick("modify")}
          >
            Modifier un évènement
          </button>
        )}
        <button
          className="action-button"
          onClick={() => handleEventClick("delete")}
        >
          Supprimer un évènement
        </button>
      </div>
      {showAddEvent && <AddEvent />}
      {showModifyEvent && <h1>Modifier un évènement</h1>}
      {showDeleteEvent && <h1>Supprimer un évènement</h1>}
    </div>
  );
};

export default Profile;
