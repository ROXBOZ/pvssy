import React, { useState } from "react";
import getToken from "../utils/getToken";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    const token = getToken();
    console.log("this is the token token", token);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        requestOptions
      );

      const result = await response.json();
      console.log("result", result);
      setUserProfile({
        userName: result.user.userName,
        userEmail: result.user.userEmail,
        userAvatar: result.user.userAvatar,
      });
      console.log("userProfile", userProfile);
      setError(null);
    } catch (error) {
      console.log("can not fetch", error);
      setUserProfile(null);
    }
  };

  return (
    <div>
      <h1>Heeeeey</h1>

      <button onClick={getProfile}>fetch user</button>
      {userProfile && (
        <div>
          <p>{userProfile.userName}</p>
          <p>{userProfile.userEmail}</p>
          <img src={userProfile.userAvatar} alt={userProfile.userName} />
        </div>
      )}
    </div>
  );
};

export default Profile;
