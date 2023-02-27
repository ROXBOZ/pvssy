import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
            <Link
              to={`https://${userProfile.userWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userProfile.userWebsite}
              <span className="screen-reader-text">ouvre un nouvel onglet</span>
            </Link>
            <br />
            {userProfile.userIsAdmin ? (
              <span>administrateur·ice</span>
            ) : (
              <span>éditeur·ice</span>
            )}
          </p>
          <button>éditer profil</button>
          <button onClick={logout}>se déconnecter</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
