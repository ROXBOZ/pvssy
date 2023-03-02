import { AuthContext } from "../../contexts/authContext";
import UserDashboard from "./UserDashboard";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  const { userProfile } = useContext(AuthContext);
  return (
    <div>
      <UserDashboard userProfile={userProfile} />

      {/* <div style={{ display: "flex", gap: "1em" }}>
        <span className="msg success"> Succès</span>
        <span className="msg reminder"> Rappel</span>
        <span className="msg pending"> En attente</span>
        <span className="msg warning"> Attention</span>
        <span className="msg archived"> Archivé</span>
        <span className="msg error"> Erreur</span>
      </div> */}

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
