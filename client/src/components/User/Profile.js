import { AuthContext } from "../../contexts/authContext";
import UserDashboard from "./UserDashboard";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  const { userProfile } = useContext(AuthContext);
  return (
    <div>
      <UserDashboard userProfile={userProfile} />

      <div className="tabbed-navigation">
        <NavLink to="ajouter">
          {userProfile && userProfile.userIsAdmin === true
            ? "Ajouter"
            : "Proposer"}
        </NavLink>
        {userProfile && userProfile.userIsAdmin === true && (
          <NavLink to="approuver">Approuver</NavLink>
        )}
        <NavLink to="supprimer">Supprimer</NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
