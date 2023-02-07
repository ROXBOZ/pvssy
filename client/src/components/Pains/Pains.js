import React, { useEffect, useContext } from "react";
import { PainsContext } from "../../contexts/PainsContext";
import PainCard from "./PainCard";

const Pains = () => {
  const { data, url, fetchData, Error, Loading } = useContext(PainsContext);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return (
    <div>
      <h1>Douleurs</h1>

      <div className="pain-card-grid">
        {data &&
          data.map((p) => {
            return <PainCard key={p.id} p={p} />;
          })}
      </div>
      {Error && <p>Error</p>}
      {Loading && <p>...loading...</p>}
    </div>
  );
};

export default Pains;
