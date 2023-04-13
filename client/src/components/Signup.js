import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex, urlRegex } from "../utils/regexExpressions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../contexts/authContext";
import { serverURL } from "../utils/serverURL";
import { HeadingArea } from "../utils/HeadingArea";

const SignupForm = () => {
  const {
    handleInputChange,
    wrongPWMessage,
    isVisible,
    seePassword,
    inputValue,
  } = useContext(AuthContext);
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
    <>
      <HeadingArea
        title="Créer un compte"
        subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quasi
          eum debitis dicta minus, molestiae quidem necessitatibus fuga optio
          ratione alias voluptas, suscipit, laudantium adipisci quam? Illum
          voluptates placeat voluptatum."
        level="h1"
      />
      <div className="grid-area">
        <div className="avatar-button-container">
          {newUser.userAvatar ? (
            <img
              name="userAvatar"
              className="user-avatar"
              src={newUser.userAvatar}
              alt="user avatar"
            />
          ) : (
            <>
              <div alt="placeholder" className="avatar-placeholder" />
              <button onClick={submitImg}>attacher le fichier</button>
            </>
          )}
        </div>
        <form className="centered grid-form">
          <div className="form-section">
            <label htmlFor="userName">Nom *</label>
            <input
              name="userName"
              id="userName"
              type="text"
              placeholder="Nom"
              onChange={handleInputChange}
              className="line"
              required
            />
            <label htmlFor="userEmail">Adresse Email *</label>
            <input
              placeholder="Adresse Email"
              id="userEmail"
              type="text"
              name="userEmail"
              onChange={handleInputChange}
              required
              className="line"
            />
            <label htmlFor="userWebsite">Site internet</label>
            <input
              name="userWebsite"
              id="userWebsite"
              type="text"
              placeholder="https://..."
              onChange={handleInputChange}
              className="line"
            />
            <label htmlFor="avatar">Photo de profil</label>

            <input
              type="file"
              id="avatar"
              name="userAvatar"
              onChange={handleAttachImg}
              className="line"
            />

            <label htmlFor="userPassword">Mot de passe</label>
            <div className="input-label-container fullwidth">
              <input
                placeholder="Mot de passe"
                type={isVisible ? "text" : "password"}
                id="userPassword"
                name="userPassword"
                onChange={handleInputChange}
                className=" line"
              />

              <button className="showPassword" onClick={seePassword}>
                <FontAwesomeIcon
                  id="eye-icon"
                  icon={isVisible ? faEye : faEyeSlash}
                />
              </button>
            </div>
          </div>
          {/* //TOFIX */}
          {/* {newUser.userName && newUser.userName.length < 2 && (
            <p className="msg error">Le nom doit être entre 2 et 20 lettres.</p>
          )} */}
          {inputValue.userEmail && !emailRegex.test(inputValue.userEmail) && (
            <p className="msg error">L'adresse e-mail est invalide.</p>
          )}
          {newUser.userWebsite && !urlRegex.test(newUser.userWebsite) && (
            <li className="error msg">L’URL du site internet est invalide.</li>
          )}
          {wrongPWMessage && <p className="msg error">{wrongPWMessage}</p>}
          {inputValue.userPassword && inputValue.userPassword.length < 6 && (
            <p className="msg error">Mot de passe min. 6 caractères.</p>
          )}
        </form>
        <div className="centered">
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

        <button
          className="centered"
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

        {message && (
          <div className={`message ${message.type}`}>{message.content}</div>
        )}

        <p className="centered">
          Déjà inscrit·e ? <Link to="/login">Se connecter</Link>.
        </p>
      </div>
    </>
  );
};

export default SignupForm;
