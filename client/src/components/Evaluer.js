import React from "react";
import Douleurs from "./Pains/Pains";
import Tutos from "./Tutos";

const Evaluer = () => {
  return (
    <div>
      <h1>Évaluer</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sit
        eos unde tenetur veritatis nemo animi fuga, exercitationem iure
        corporis. Alias dignissimos temporibus consequatur necessitatibus
        excepturi voluptates accusantium sit in?
      </p>
      <p className="red">
        DOULEURS et TUTOS devraient être des blocs-liens redirectifs. QUELLE
        DIFFéRENCE ENTRE S'AUTO-EXAMINER ET COMPRENDRE
      </p>
      <Douleurs />
      <Tutos />
    </div>
  );
};

export default Evaluer;
