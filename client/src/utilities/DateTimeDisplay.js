import React from "react";

const DateTimeDisplay = ({ value, type }) => {
  return (
    <>
      <span>
        {value} {type}
      </span>
    </>
  );
};

export default DateTimeDisplay;
