import React, { useContext } from "react";

import { AuthContext } from "../../contexts/authContext";

const UserDashboard = ({ userProfile }) => {
  const { logout } = useContext(AuthContext);
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
            <strong> {userProfile.userName}</strong>
            <br />
            {userProfile.userEmail}
            <br />
            {userProfile.userIsAdmin ? (
              <span>administrateur·ice</span>
            ) : (
              <span>éditeur·ice</span>
            )}
          </p>
          <button onClick={logout}>se déconnecter</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
