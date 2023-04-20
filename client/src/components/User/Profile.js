import { AuthContext } from "../../contexts/authContext";
import UserDashboard from "./UserDashboard";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faPen,
  faTrashCan,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { userProfile, isMobile } = useContext(AuthContext);
  console.log("isMobile :", isMobile);
  return (
    <div>
      <UserDashboard userProfile={userProfile} />

      <div
        className="tabbed-navigation-container"
        style={{ height: "fit-content", backgroundColor: "transparent" }}
      >
        <div className="tabbed-navigation">
          <NavLink className="tab" to="ajouter">
            {isMobile ? (
              <FontAwesomeIcon icon={faPlus} />
            ) : (
              <span>Ajouter</span>
            )}
          </NavLink>
          {userProfile && userProfile.userIsAdmin === true && (
            <NavLink to="approuver">
              {isMobile ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <span>Approuver</span>
              )}
            </NavLink>
          )}
          <p>
            {isMobile ? (
              <FontAwesomeIcon icon={faPen} />
            ) : (
              <span>Modifier</span>
            )}
          </p>
          <NavLink to="supprimer">
            {isMobile ? (
              <FontAwesomeIcon icon={faTrashCan} />
            ) : (
              <span>Supprimer</span>
            )}
          </NavLink>
          <p to="/">
            {isMobile ? (
              <FontAwesomeIcon icon={faClockRotateLeft} />
            ) : (
              <span>Historique</span>
            )}
          </p>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Profile;
