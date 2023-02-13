import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});

  const handleAttachImg = (e) => {
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

  return (
    <div>
      <h1>Créer un compte</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quasi
        eum debitis dicta minus, molestiae quidem necessitatibus fuga optio
        ratione alias voluptas, suscipit, laudantium adipisci quam? Illum
        voluptates placeat voluptatum.
      </p>
      <Link to="/">Conditions générales</Link>
      <form>
        {/* <label */}
        <input type="checkbox" />
        <div>
          <label htmlFor="newUserName">Nom de l’association</label>
          <input id="newUserName" type="text" placeholder="Nom" />
        </div>

        <div>
          <div>
            <label htmlFor="avatar">Logo de l’association</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleAttachImg}
            ></input>
          </div>
          <button onClick={submitImg}>téléverser</button>
          <div>
            {newUser && <img src={newUser.userAvatar} alt="user avatar" />}
          </div>
        </div>
      </form>
      <p>
        Déjà inscrit·e ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default Signup;
