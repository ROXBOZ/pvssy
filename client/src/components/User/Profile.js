import { AuthContext } from "../../contexts/authContext";
import UserDashboard from "./UserDashboard";
import { useContext, useState } from "react";
import AddEvent from "../Agenda/AddEvent";
import DeleteEvent from "../Agenda/DeleteEvent";
import ModifyEvent from "../Agenda/ModifyEvent";
import ApproveEvent from "../Agenda/ApproveEvent";

const Profile = () => {
  const { userProfile } = useContext(AuthContext);
  const [showAddEvent, setShowAddEvent] = useState(true);
  const [showModifyEvent, setShowModifyEvent] = useState(false);
  const [showDeleteEvent, setShowDeleteEvent] = useState(false);
  const [showPendingEvent, setShowPendingEvent] = useState(false);

  const [activeButton, setActiveButton] = useState(null);

  const handleEventClick = (eventType) => {
    switch (eventType) {
      case "add":
        setShowAddEvent(true);
        setShowModifyEvent(false);
        setShowDeleteEvent(false);
        setShowPendingEvent(false);
        break;
      case "modify":
        setShowAddEvent(false);
        setShowModifyEvent(true);
        setShowDeleteEvent(false);
        setShowPendingEvent(false);
        break;
      case "delete":
        setShowAddEvent(false);
        setShowModifyEvent(false);
        setShowDeleteEvent(true);
        setShowPendingEvent(false);
        break;
      case "approve":
        setShowAddEvent(false);
        setShowModifyEvent(false);
        setShowDeleteEvent(false);
        setShowPendingEvent(true);
        break;
      default:
        setShowAddEvent(false);
        setShowModifyEvent(false);
        setShowDeleteEvent(false);
        setShowPendingEvent(false);
    }
    setActiveButton(eventType);
  };

  const isActive = (buttonType) => {
    return activeButton === buttonType ? "active" : "";
  };

  return (
    <div>
      <UserDashboard userProfile={userProfile} />

      <div className="action-container">
        <button
          className={`action-button ${isActive("add")}`}
          onClick={() => handleEventClick("add")}
        >
          {userProfile && userProfile.userIsAdmin === true ? (
            <span>Ajouter</span>
          ) : (
            <span>Proposer</span>
          )}
        </button>

        <button
          disabled
          className={`action-button ${isActive("modify")}`}
          onClick={() => handleEventClick("modify")}
        >
          Modifier
        </button>

        {userProfile && userProfile.userIsAdmin === true && (
          <button
            className={`action-button ${isActive("approve")}`}
            onClick={() => handleEventClick("approve")}
          >
            Approuver
          </button>
        )}

        <button
          disabled={
            userProfile && userProfile.userIsAdmin === false ? true : false
          }
          className={`action-button ${isActive("delete")}`}
          onClick={() => handleEventClick("delete")}
        >
          Supprimer
        </button>
      </div>
      {showAddEvent && <AddEvent />}
      {showModifyEvent && <ModifyEvent />}
      {showPendingEvent && <ApproveEvent />}
      {showDeleteEvent && <DeleteEvent />}
    </div>
  );
};

export default Profile;
