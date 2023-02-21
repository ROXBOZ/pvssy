import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(getToken());
  const [, setError] = useState(null);

  const getProfile = async () => {
    if (token) {
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

        setUserProfile({
          userName: result.user.userName,
          userEmail: result.user.userEmail,
          userAvatar: result.user.userAvatar,
          userIsAdmin: result.user.userIsAdmin,
        });
        setError(null);
      } catch (error) {
        console.log("can not fetch", error);
      }
    }
  };

  useEffect(() => {
    getProfile();
    if (token) {
      setIsLoggedIn(true);
      setToken(token);
      console.log("IS LOGGED IIIIIIN");
    } else {
      setIsLoggedIn(false);
      setToken(null);
      console.log("IS NOOOOOT LOGGED IN");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        isLoggedIn,
        user,
        setUser,
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
