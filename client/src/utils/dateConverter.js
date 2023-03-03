export const dateTimeConverter = (isoDate) => {
  const newDate = new Date(isoDate);
  const weekday = new Intl.DateTimeFormat("fr-CH", { weekday: "long" })
    .format(newDate)
    .replace(/^\w/, (c) => c.toUpperCase());
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const dateTimeoptions = { ...dateOptions, ...timeOptions };
  return `${weekday} ${newDate.toLocaleDateString("fr-CH", dateTimeoptions)}`;
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

// export const dateNumbersConverter = (isoDate) => {
//   const newDate = new Date(isoDate);
//   const dateOptions = {
//     year: "2-digit",
//     month: "numeric",
//     day: "numeric",
//   };
//   const dateTimeoptions = { ...dateOptions };
//   const formattedDate = newDate.toLocaleDateString("fr-CH", dateTimeoptions);
//   const dateNumbers = formattedDate.split(".");
//   return `${dateNumbers[0]}\n${dateNumbers[1]}\n${dateNumbers[2]}`;
// };
