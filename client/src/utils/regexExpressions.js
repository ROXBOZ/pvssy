const today = new Date();
const todayISO = today.toISOString();
const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const addressRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
const cityRegex = /^(?=.*[a-zA-Z])(?=.*\d{4}).+$/;
const swissTelRegex =
  /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const urlRegex =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

const isDateMoreThanThreeDaysAway = (isoDateString) => {
  const inputDate = new Date(isoDateString);
  const threeDaysFromNow = new Date(today.setDate(today.getDate() + 3));
  return dateRegex.test(isoDateString) && inputDate > threeDaysFromNow;
};

export {
  today,
  todayISO,
  dateRegex,
  addressRegex,
  cityRegex,
  swissTelRegex,
  emailRegex,
  urlRegex,
  isDateMoreThanThreeDaysAway,
};
