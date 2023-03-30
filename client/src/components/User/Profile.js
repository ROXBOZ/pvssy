import { AuthContext } from "../../contexts/authContext";
import UserDashboard from "./UserDashboard";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  const { userProfile } = useContext(AuthContext);
  return (
    <div>
      <UserDashboard userProfile={userProfile} />

      <div className="tabbed-navigation-container">
        <div className="tabbed-navigation">
          <NavLink to="ajouter">
            {userProfile && userProfile.userIsAdmin === true
              ? "Ajouter"
              : "Proposer"}
          </NavLink>
          {userProfile && userProfile.userIsAdmin === true && (
            <NavLink to="approuver">Approuver</NavLink>
          )}
          <p>Modifier</p>
          <NavLink to="supprimer">Supprimer</NavLink>
          <p to="/">Historique</p>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Profile;
