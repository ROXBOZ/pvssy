import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const UserDashboard = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <div>
      {userProfile && (
        <div className="userProfile-info">
          <img
            className="userProfile-avatar"
            src={userProfile.userAvatar}
            alt={userProfile.userName}
          />
          <p>
            {userProfile.userName}
            <br />
            {userProfile.userEmail}
            <br />
            {userProfile.userIsAdmin ? (
              <span>administrateur·ice</span>
            ) : (
              <span>éditeur·ice</span>
            )}
            <br />
            <Link to="/logout">se déconnecter</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
