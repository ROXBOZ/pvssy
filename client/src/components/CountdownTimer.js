import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import useCountdown from "../hooks/useCountdown";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <span className="show-counter">
      <DateTimeDisplay value={days} type={"jrs"} />
      <span>·</span>
      <DateTimeDisplay value={hours} type={"hrs"} />
      <span>·</span>
      <DateTimeDisplay value={minutes} type={"min"} />
      <span>·</span>
      <DateTimeDisplay value={seconds} type={"sec"} />
    </span>
  );
};

const CountdownTimer = ({ isoDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(isoDate);
  if (days + hours + minutes + seconds > 0) {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
