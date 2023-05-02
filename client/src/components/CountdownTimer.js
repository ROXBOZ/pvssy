import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import useCountdown from "../utils/useCountdown";
import { fromNowToDate } from "../utils/fromNowToDate";

const ShowCounter = ({ days, hours, minutes }) => {
  return (
    <div className="show-counter">
      <DateTimeDisplay value={days} type={"jrs"} />
      <span> · </span>
      <DateTimeDisplay value={hours} type={"hrs"} />
      <span> · </span>
      <DateTimeDisplay value={minutes} type={"min"} />
    </div>
  );
};

const CountdownTimer = ({ isoDate }) => {
  const { eventDateInMilli, todayStartinMilli, todayEndinMilli } =
    fromNowToDate(isoDate);
  const [days, hours, minutes] = useCountdown(isoDate);
  if (eventDateInMilli > todayEndinMilli) {
    return <ShowCounter days={days} hours={hours} minutes={minutes} />;
  } else if (eventDateInMilli < todayStartinMilli) {
    return <span>L’évènement est terminé</span>;
  } else {
    return <span>L’évènement a lieu aujourd’hui. Soyez à l’heure!</span>;
  }
};

export default CountdownTimer;
