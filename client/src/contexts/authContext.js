import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const redirectTo = useNavigate();
  const [inputValue, setInputValue] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(getToken());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wrongPWmessage, setwrongPWMessage] = useState("");

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userEmail", inputValue.userEmail);
    urlencoded.append("userWebsite", inputValue.userWebsite);
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
        setUser(result.user);
        setIsLoggedIn(true);
        setToken(result.token);
        await getProfile(result.token);
        redirectTo("/profile/ajouter");
      }
    } catch (error) {
      console.log("error", error);
      setwrongPWMessage("Mauvais mot de passe");
      console.log("coucou :");
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        requestOptions
      );
      const result = await response.json();

      setUserProfile({
        userName: result.user.userName,
        userEmail: result.user.userEmail,
        userWebsite: result.user.userWebsite,
        userAvatar: result.user.userAvatar,
        userIsAdmin: result.user.userIsAdmin,
      });
      setError(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const logout = (e) => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    setUserProfile(null);
    redirectTo("/login");
  };

  useEffect(() => {
    if (token) {
      getProfile();
      setIsLoggedIn(true);
      setToken(token);
    } else {
      setIsLoggedIn(false);
      setUserProfile(null);
      setToken(null);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        inputValue,
        userProfile,
        isLoggedIn,
        user,
        token,
        wrongPWmessage,
        setUser,
        setIsLoggedIn,
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
