import React from "react";
import getToken from "../utils/getToken";

const Profile = () => {
  const getProfile = async () => {
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    if (token) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          requestOptions
        );
        const result = await response.json();
        console.log("result", result);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log("you need to login ");
    }
    return (
      <>
        <h1>Profil</h1>
      </>
    );
  };

  return (
    <>
      <h1>Heeeeey</h1>
    </>
  );
};

export default Profile;
