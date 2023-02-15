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
    // console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    // computed property names
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    //
    console.log("userName", newUser.userName);
    console.log("userPassword", newUser.userPassword);
    console.log("userEmail", newUser.userEmail);
    console.log("userAvatar", newUser.userAvatar);
  };

  const signup = async () => {
    // check email format + password length
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
        : "https://cdn-icons-png.flaticon.com/512/634/634742.png"
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
            <label htmlFor="AssoName">Nom de l’association</label>
          ) : (
            <label htmlFor="userName">Nom</label>
          )}
        </div>
        <div>
          {userType === "association" ? (
            <input
              id="AssoName"
              type="text"
              placeholder="Nom Association"
              onChange={handleInputChange}
            />
          ) : (
            <input
              id="newUserName"
              type="text"
              placeholder="Nom"
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          {userType === "association" ? (
            ""
          ) : (
            <label htmlFor="userName">Prénom</label>
          )}
        </div>
        <div>
          {userType === "association" ? (
            ""
          ) : (
            <input
              // value={newUser.userName}
              id="newUserName"
              type="text"
              placeholder="Prénom"
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label htmlFor="newUserEmail">Adresse Email</label>
        </div>
        <div>
          <input
            // value={newUser.userEmail}
            placeholder="Adresse email"
            id="newUserEmail"
            type="text"
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
            // value={newUser.userAvatar}
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleAttachImg}
          ></input>
        </div>
        <div>
          <button onClick={submitImg}>choisir</button>
        </div>
        <div></div>
        <div>
          <label htmlFor="password">Mot de passe</label>
        </div>
        <div>
          <input
            // value={newUser.userPassword}
            type="text"
            id="password"
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
