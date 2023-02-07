import React from "react";

const PainCard = ({ name, def }) => {
  return (
    <div className="pain-card">
      <p>{name}</p>
      {/* <p>{def}</p> */}
    </div>
  );
};

export default PainCard;
