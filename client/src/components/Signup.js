import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignupForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});

  const [userType, setUserType] = useState("association");
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
      // console.log("response", response);
      const result = await response.json();
      setNewUser({ ...newUser, userAvatar: result.userAvatar });

      // console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value }); // computed property names
  };

  const signup = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("userEmail", newUser.userEmail);
    urlencoded.append("userPassword", newUser.userPassword);
    urlencoded.append(
      "userAvatar",
      newUser.userAvatar
        ? newUser.userAvatar
        : "https://res.cloudinary.com/dkyialww7/image/upload/v1676473404/pvssy-avatar/default-avatar_hffziv.jpg"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="title-area">
        <h1>Créer un compte</h1>
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
        <p className="avatar-placeholder"></p>
      )}
      <form className="grid-form">
        <span>
          <input
            id="asso"
            type="radio"
            name="userType"
            checked={userType === "association"}
            onChange={() => setUserType("association")}
          />
          <label htmlFor="asso">Association</label>
          <input
            id="person"
            type="radio"
            name="userType"
            checked={userType === "personne"}
            onChange={() => setUserType("personne")}
          />
          <label htmlFor="person">Personne</label>
        </span>
        <div></div>
        <div></div>
        <div></div>
        <div>
          {userType === "association" ? (
            <label htmlFor="assoName">Nom de l’association</label>
          ) : (
            <label htmlFor="userName">Nom</label>
          )}
        </div>
        <div>
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
              placeholder="Nom"
              name="userName"
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          {userType === "association" ? (
            ""
          ) : (
            <label htmlFor="userFirstname">Prénom</label>
          )}
        </div>
        <div>
          {userType === "association" ? (
            ""
          ) : (
            <input
              id="userFirstname"
              type="text"
              placeholder="Prénom"
              name="userFirstname"
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label htmlFor="userEmail">Adresse Email</label>
        </div>
        <div>
          <input
            placeholder="Adresse email"
            id="userEmail"
            type="text"
            name="userEmail"
            onChange={handleInputChange}
          />
        </div>
        <div></div>
        <div></div>
        <div>
          <label htmlFor="avatar">
            {userType === "association"
              ? "Logo de l’association"
              : "Photo de profil"}
          </label>
        </div>
        <div>
          <input
            type="file"
            id="avatar"
            name="userAvatar"
            onChange={handleAttachImg}
          ></input>
        </div>
        <div>
          <button onClick={submitImg}>choisir</button>
        </div>
        <div></div>
        <div>
          <label htmlFor="userPassword">Mot de passe</label>
        </div>
        <div>
          <input
            type="text"
            id="userPassword"
            name="userPassword"
            onChange={handleInputChange}
          />
        </div>
        <div>min. 6 ch.</div>
        <div></div>
        <span>
          <input id="conditionsCheckbox" type="checkbox" required />
          <label htmlFor="conditionsCheckbox">
            J’ai lu et j’accepte
            <br />
            les <Link to="/">conditions générales</Link>.
          </label>
        </span>
        <div></div>
        <div></div>
        <div></div>
        <div>
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
