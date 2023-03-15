import React from "react";
import { Link } from "react-router-dom";

const DonationBanner = () => {
  return (
    <div className="donation-banner">
      <div className="donation-banner-content">
        <h4>
          Faire un don à <span className="logo">pvssy talk</span>
        </h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat porro
          esse quos adipisci aperiam libero beatae.{" "}
          {/* <strong>
            Association NO DOLOR, Banque Cantonale Vaudoise,{" "}
            <nobr>CH12 3456 7890 1234 5678 9</nobr>
          </strong> */}
        </p>
        <div className="button-link-container">
          <button>par TWINT</button>
          <Link to="/faire-un-don">Alternatives</Link>
        </div>
      </div>
    </div>
  );
};

export default DonationBanner;
