import React, { useState } from "react";
import getToken from "../utils/getToken";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  const test = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2VlMTcxOGRmMmJjZDk5ZDUxOWRhOWYiLCJpYXQiOjE2NzY2NTA4NjMsImV4cCI6MTY3NjgyMzY2MywiaXNzIjoiUHZzc3kgVGFsayJ9.tyz2BKYKYyHrImuwh8y16TIdV6ZgGtSMyWcZgMz6U_c"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/users/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const getProfile = async () => {
    const token = getToken();
    console.log("token", token);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    // console.log("token in header", myHeaders.get("Authorization"));

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        requestOptions
      );
      console.log("response", response);
      const result = response.json();
      console.log("result", result);
      setUserProfile({
        userName: result.user.userName,
        userEmail: result.user.userEmail,
        userAvatar: result.user.userAvatar,
      });
      setError(null);
    } catch (error) {
      console.log("can not fetch", error);
      setUserProfile(null);
    }
  };

  return (
    <div>
      <h1>Heeeeey</h1>
      {/* <button onClick={getProfile}>fetch user</button> */}
      <button onClick={test}>fetch user</button>
      {userProfile && (
        <div>
          <p>{userProfile.userName}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
