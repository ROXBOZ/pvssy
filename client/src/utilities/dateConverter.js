export const dateTimeConverter = (isoDate) => {
  const newDate = new Date(isoDate);
  // const weekday = new Intl.DateTimeFormat("fr-CH", { weekday: "long" })
  //   .format(newDate)
  //   .replace(/^\w/, (c) => c.toUpperCase());

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    hourCycle: "h23",
  };
  const dateTimeoptions = { ...dateOptions, ...timeOptions };
  return `${newDate.toLocaleDateString("fr-CH", dateTimeoptions)}`;
};

export const dateConverter = (isoDate) => {
  const newDate = new Date(isoDate);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateTimeoptions = { ...dateOptions };
  return newDate.toLocaleDateString("fr-CH", dateTimeoptions);
};

export const dateConverterNoWeekday = (isoDate) => {
  const newDate = new Date(isoDate);
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateTimeoptions = { ...dateOptions };
  return newDate.toLocaleDateString("fr-CH", dateTimeoptions);
};

export const timeConverter = (isoDate) => {
  const date = new Date(isoDate);
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const timeString = date.toLocaleTimeString("fr-CH", timeOptions);
  const formattedTimeString = timeString.replace(":", "h");
  return formattedTimeString;
};
