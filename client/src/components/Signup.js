import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex, urlRegex } from "../utils/regexExpressions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../contexts/authContext";
import { serverURL } from "../utils/serverURL";

const SignupForm = () => {
  const { seePassword, isVisible } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [conditionsAccepted, setConditionsAccepted] = useState(null);
  const [message, setMessage] = useState("");

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
        `${serverURL}/api/users/imageUpload`,
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
        `${serverURL}/api/users/signup`,
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setMessage({
        type: "success",
        content: (
          <p className="msg success">
            Votre compte a été créé. Veuillez maintenant vous connecter.
          </p>
        ),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (message && message.type === "success") {
      setTimeout(() => {
        redirectTo("/login");
      }, 3000);
    }
  }, [message]);

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
        {/* <div className="user-type flex-center">
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
        </div> */}
        <div className="user-name-label flex-center">
          <label htmlFor="userName">Nom *</label>
        </div>
        <div className="user-name-input">
          <input
            name="userName"
            id="userName"
            type="text"
            placeholder="Nom"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="user-email-label flex-center">
          <label htmlFor="userEmail">Adresse Email *</label>
        </div>
        <div className="user-email-input">
          <input
            placeholder="Adresse Email"
            id="userEmail"
            type="text"
            name="userEmail"
            onChange={handleInputChange}
            required
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
            placeholder="https://..."
            onChange={handleInputChange}
          />
        </div>
        <div className="user-avatar-label flex-center">
          <label htmlFor="avatar">Photo de profil</label>
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
          <label htmlFor="userPassword">Mot de passe *</label>
        </div>
        <div className="user-password-input">
          <input
            placeholder="Mot de passe"
            type={isVisible ? "text" : "password"}
            id="userPassword"
            name="userPassword"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="user-password-error">
          <button className="showPassword" onClick={seePassword}>
            <FontAwesomeIcon
              id="eye-icon"
              icon={isVisible ? faEye : faEyeSlash}
            />
          </button>
          {newUser.userPassword && newUser.userPassword.length < 6 && (
            <li className="error msg">min 6 caractères.</li>
          )}
        </div>

        <div className="conditions-generales">
          <input
            className="form-check-input"
            id="conditionsCheckbox"
            type="checkbox"
            onChange={(e) => setConditionsAccepted(e.target.checked)}
            required
          />
          <label htmlFor="conditionsCheckbox">
            J’ai lu et j’accepte les{" "}
            <Link to="/conditions-generales ">conditions générales</Link>.
          </label>
        </div>
        <div className="submit-button">
          <button
            onClick={signup}
            disabled={
              !(newUser.userPassword &&
              newUser.userPassword > 6 &&
              newUser.userName &&
              newUser.userName > 2 &&
              newUser.Website
                ? urlRegex.test(newUser.userWebsite)
                : true && conditionsAccepted)
            }
          >
            Créer un compte
          </button>
        </div>
      </form>
      <ul className="error-list">
        {newUser.userName && newUser.userName.length < 2 && (
          <li className="error msg">Le nom doit être entre 2 et 20 lettres.</li>
        )}
        {newUser.userEmail && !emailRegex.test(newUser.userEmail) && (
          <li className="error msg">L’adresse email est invalide.</li>
        )}
        {newUser.userWebsite && !urlRegex.test(newUser.userWebsite) && (
          <li className="error msg">L’URL du site internet est invalide.</li>
        )}
      </ul>
      {message && (
        <div className={`message ${message.type}`}>{message.content}</div>
      )}

      <p>
        Déjà inscrit·e ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default SignupForm;
