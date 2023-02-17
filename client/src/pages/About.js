import React from "react";

const About = () => {
  console.log("localStorage.getItem();", localStorage.getItem("token"));
  return (
    <div>
      <h1>À propos</h1>
    </div>
  );
};

export default About;
