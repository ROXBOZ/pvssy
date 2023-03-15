import React from "react";

const DonationBanner = () => {
  return (
    <div className="donation-banner">
      <div className="donation-banner-content">
        <h4>
          Donation à <span className="logo">pvssy talk</span>
        </h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat porro
          esse quos adipisci aperiam libero beatae, consequatur eaque voluptatum
          quis alias temporibus culpa magni suscipit maxime ipsa et doloribus
          quibusdam.
        </p>
        <br />
        <p>
          Banque Truc
          <br />
          IBAN : xxx
        </p>
        <br />
        <button>Donner avec Twint</button>
      </div>
    </div>
  );
};

export default DonationBanner;
