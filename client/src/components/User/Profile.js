import { AuthContext } from "../../contexts/authContext";
import UserDashboard from "./UserDashboard";
import { useContext, useState } from "react";
import AddEvent from "../Agenda/AddEvent";
import DeleteEvent from "../Agenda/DeleteEvent";
import ModifyEvent from "../Agenda/ModifyEvent";

const Profile = () => {
  const { userProfile } = useContext(AuthContext);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showModifyEvent, setShowModifyEvent] = useState(false);
  const [showDeleteEvent, setShowDeleteEvent] = useState(false);

  const [activeButton, setActiveButton] = useState(null);

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
          )}{" "}
          un évènement
        </button>
        {/* {userProfile && userProfile.userIsAdmin === true && ( */}
        <button
          className={`action-button ${isActive("modify")}`}
          onClick={() => handleEventClick("modify")}
        >
          Modifier un évènement
        </button>
        {/* )} */}
        <button
          className={`action-button ${isActive("delete")}`}
          onClick={() => handleEventClick("delete")}
        >
          Supprimer un évènement
        </button>
      </div>
      {showAddEvent && <AddEvent />}
      {showModifyEvent && <ModifyEvent />}
      {showDeleteEvent && <DeleteEvent />}
    </div>
  );
};

export default Profile;
