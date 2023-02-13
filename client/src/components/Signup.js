import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [userType, setUserType] = useState("association");
  const [fileName, setFileName] = useState("Aucun fichier choisi");

  const handleAttachImg = (e) => {
    setFileName(e.target.value.split("\\").pop() || "Aucun fichier choisi");
    setSelectedFile(e.target.files[0]);
  };

  const submitImg = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://localhost:5000/api/users/imageUpload", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error!!!", error));
  };

  const handleInputChange = (e) => {
    console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <h1>Créer un compte</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quasi
          eum debitis dicta minus, molestiae quidem necessitatibus fuga optio
          ratione alias voluptas, suscipit, laudantium adipisci quam? Illum
          voluptates placeat voluptatum.
        </p>
      </div>

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
            name="email"
            cid="newUserEmail"
            type="text"
            id="email"
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
            name="avatar"
            onChange={handleAttachImg}
          ></input>
        </div>
        <div>
          <button onClick={submitImg}>téléverser</button>
        </div>
        <div>
          {newUser && <img src={newUser.userAvatar} alt="user avatar" />}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
        </div>
        <div>
          <input type="text" id="password" onChange={handleInputChange} />
        </div>
        <div>
          {/* <label htmlFor="password">Répéter le mot de passe</label> */}
        </div>
        <div>{/* <input type="text" id="passwordRepeat" /> */}</div>
        <span>
          <input id="conditionsCheckbox" type="checkbox" required />
          <label htmlFor="conditionsCheckbox">
            J’ai lu et j’accepte les <Link to="/">conditions générales</Link>.
          </label>
        </span>
        <div></div>
        <div></div>
        <div></div>
        <div>
          <button>Créer un compte</button>
        </div>
      </form>

      <p>
        Déjà inscrit·e ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default Signup;
