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

  return (
    <div>
      <UserDashboard userProfile={userProfile} />

      <div className="tabbed-navigation-container profil">
        <div className="tabbed-navigation">
          <NavLink to="ajouter">
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
