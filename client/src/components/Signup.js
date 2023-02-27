import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [userType, setUserType] = useState("association");
  const redirectTo = useNavigate();
  const handleAttachImg = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitImg = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", selectedFile);
    const requestOptions = {
      method: "POST",
      body: formdata,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );
      const result = await response.json();
      setNewUser({ ...newUser, userAvatar: result.userAvatar });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      userName: newUser.userName,
      userEmail: newUser.userEmail,
      userWebsite: newUser.userWebsite,
      userPassword: newUser.userPassword,
      userAvatar: newUser.userAvatar
        ? newUser.userAvatar
        : "https://res.cloudinary.com/dkyialww7/image/upload/v1676473404/pvssy-avatar/default-avatar_hffziv.jpg",
      userIsAdmin: false,
    });
    console.log("raw", raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
    alert("compte créé, veuillez vous connecter");
    redirectTo("/login");
  };

  return (
    <div>
      <div className="title-area">
        <h1>
          Créer un compte<sup>prototype</sup>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quasi
          eum debitis dicta minus, molestiae quidem necessitatibus fuga optio
          ratione alias voluptas, suscipit, laudantium adipisci quam? Illum
          voluptates placeat voluptatum.
        </p>
      </div>

      {newUser.userAvatar ? (
        <img
          name="userAvatar"
          className="user-avatar"
          src={newUser.userAvatar}
          alt="user avatar"
        />
      ) : (
        <p className="avatar-placeholder" />
      )}

      <form className="grid-form">
        <div className="user-type flex-center">
          <span>
            <input
              className="form-check-input"
              id="asso"
              type="radio"
              name="userType"
              checked={userType === "association"}
              onChange={() => setUserType("association")}
            />
            <label htmlFor="asso">Association</label>
          </span>
          <span>
            <input
              className="form-check-input"
              id="person"
              type="radio"
              name="userType"
              checked={userType === "personne"}
              onChange={() => setUserType("personne")}
            />
            <label htmlFor="person">Personne</label>
          </span>
        </div>
        <div className="user-name-label flex-center">
          {userType === "association" ? (
            <label htmlFor="assoName">Nom de l’association</label>
          ) : (
            <label htmlFor="userName">Prénom</label>
          )}
        </div>
        <div className="user-name-input">
          {userType === "association" ? (
            <input
              name="userName"
              id="assoNameName"
              type="text"
              placeholder="Nom Association"
              onChange={handleInputChange}
            />
          ) : (
            <input
              id="userName"
              type="text"
              placeholder="Prénom"
              name="userName"
              onChange={handleInputChange}
            />
          )}
        </div>
        <div className="user-email-label flex-center">
          <label htmlFor="userEmail">Adresse Email</label>
        </div>
        <div className="user-email-input">
          <input
            placeholder="Adresse Email"
            id="userEmail"
            type="text"
            name="userEmail"
            onChange={handleInputChange}
          />
        </div>
        <div className="user-website-label flex-center">
          <label htmlFor="userWebsite">Site internet</label>
        </div>
        <div className="user-website-input">
          <input
            name="userWebsite"
            id="userWebsite"
            type="text"
            placeholder="Site internet"
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="user-email-requirements"> */}
        {/* TODO */}
        {/* </div> */}
        <div className="user-avatar-label flex-center">
          <label htmlFor="avatar">
            {userType === "association"
              ? "Logo de l’association"
              : "Photo de profil"}
          </label>
        </div>
        <div className="user-avatar-input">
          <input
            type="file"
            id="avatar"
            name="userAvatar"
            onChange={handleAttachImg}
          ></input>
        </div>
        <div className="user-avatar-button flex-center">
          <button onClick={submitImg}>choisir</button>
        </div>
        <div className="user-password-label flex-center">
          <label htmlFor="userPassword">Mot de passe</label>
        </div>
        <div className="user-password-input">
          <input
            placeholder="Mot de passe"
            type="password"
            id="userPassword"
            name="userPassword"
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="user-password-requirements flex-center"> */}
        {/* TODO */}
        {/* </div> */}
        <div className="conditions-generales">
          <input
            className="form-check-input"
            id="conditionsCheckbox"
            type="checkbox"
            required
          />
          <label htmlFor="conditionsCheckbox">
            J’ai lu et j’accepte les{" "}
            <Link to="/conditions-generales ">conditions générales</Link>.
          </label>
        </div>
        <div className="submit-button">
          <button onClick={signup}>Créer un compte</button>
        </div>
      </form>

      <p>
        Déjà inscrit·e ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default SignupForm;
