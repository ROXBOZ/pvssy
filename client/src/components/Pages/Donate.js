import React from "react";
import { HeadingArea } from "../../utils/HeadingArea";

const Donate = () => {
  return (
    <div>
      <HeadingArea
        title="Faire un don"
        level="h1"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
            laboriosam eveniet laudantium illum velit tenetur eius expedita
            aliquid deleniti ab explicabo non accusantium dolorum atque, nulla
            quibusdam error distinctio earum."
      />

      <div className="grid-area">
        <div className="centered">
          <h2 className="h3">TWINT (+ RaiseNow)</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
            laboriosam eveniet laudantium illum velit tenetur eius expedita
            aliquid deleniti ab explicabo non accusantium dolorum atque, nulla
            quibusdam error distinctio earum.
          </p>
          <h2 className="h3">PayPal</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            voluptatum esse dolore odit consectetur nobis veniam odio totam
            corporis, officiis molestias doloribus culpa pariatur maiores
            placeat nam reiciendis, similique tempore?
          </p>
          <button>Virement par Paypal</button>
          <h2 className="h3">Virement bancaire</h2>
          <p>
            <strong>
              Association NO DOLOR, Banque Cantonale Genevoise, IBAN: 12345 6789
              1234
            </strong>
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            ab omnis enim esse quod eum, rem reiciendis odit doloribus
            voluptate. Rem officiis laborum placeat nobis id! Veritatis quis
            suscipit aspernatur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
