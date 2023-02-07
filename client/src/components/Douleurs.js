import React, { useEffect, useContext } from "react";
import { PainsContext } from "../contexts/PainsContext";
import PainCard from "./PainCard";

const Douleurs = () => {
  const { data, url, fetchData, Error, Loading } = useContext(PainsContext);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  console.log("data", data.allPains);

  return (
    <div>
      <h1>Douleurs</h1>
      <div className="pain-card-grid">
        {data.allPains &&
          data.allPains.map((p) => {
            const name = p.name;
            const def = p.def;
            return <PainCard name={name} def={def} />;
          })}
      </div>
      {Error && <p>Error</p>}
      {Loading && <p>...loading...</p>}
    </div>
  );
};

export default Douleurs;
