import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utilities/getToken";
import { serverURL } from "../utilities/serverURL";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const redirectTo = useNavigate();
  const [inputValue, setInputValue] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(getToken());
  const [, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wrongPWMessage, setWrongPWMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = window.innerWidth <= 576;

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
        `${serverURL}/api/users/login`,
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
      } else {
        setWrongPWMessage("Mauvais mot de passe");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfile = async () => {
    console.log("%cgetprofile", "color:red");
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const response = await fetch(
        `${serverURL}/api/users/profile`,
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
    redirectTo("/");
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
    return (
      <div className="loader">
        <img src={require(`../assets/images/vulka.png`)} alt="" />
        <p className="h3">Ça charge...</p>
      </div>
    );
  }

  const seePassword = (e) => {
    e.preventDefault();
    setIsVisible((prevState) => !prevState);
  };

  return (
    <AuthContext.Provider
      value={{
        inputValue,
        userProfile,
        isLoggedIn,
        user,
        token,
        wrongPWMessage,
        setUser,
        setIsLoggedIn,
        logout,
        login,
        handleInputChange,
        getProfile,
        isVisible,
        setIsVisible,
        seePassword,
        isMobile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
