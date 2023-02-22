import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const [inputValue, setInputValue] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const redirectTo = useNavigate();
  const [token, setToken] = useState(getToken());
  const [, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userEmail", inputValue.userEmail);
    urlencoded.append("userPassword", inputValue.userPassword);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        requestOptions
      );
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        // getProfile();
        setUser(result.user);
        setIsLoggedIn(true);
        redirectTo("/profile");
        console.log("LOGIN FUNCTION");
        console.log("user", user); //FIXME this is still null
        console.log("isLoggedIn", isLoggedIn); //FIXME this is still false
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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

  const logout = (e) => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    setUserProfile(null);
    redirectTo("/login");
    console.log("LOGOUT FUNCTION");
    console.log("isLoggedIn", isLoggedIn); // this is false
    console.log("userProfile", userProfile); //FIXME this is not null
    console.log("user", user); // this null
  };

  useEffect(() => {
    if (token) {
      getProfile();
      setIsLoggedIn(true);
      setToken(token);
      console.log("IS LOGGED IN");
      console.log("token", token);
      console.log("isLoggedIn", isLoggedIn); //FIXME this should be true
    } else {
      setIsLoggedIn(false);
      setUserProfile(null);
      setToken(null);
      console.log("IS NOT LOGGED IN");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        token,
        logout,
        login,
        handleInputChange,
        getProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
