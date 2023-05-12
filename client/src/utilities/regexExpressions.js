const today = new Date();
const todayISO = today.toISOString();
const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const addressRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
const cityRegex = /^(\d{4})?\s*[a-zA-ZÀ-ÿ]+([ '-][a-zA-ZÀ-ÿ]+)*$/;

const swissTelRegex =
  /^(0041|\+41|0)((\s?\(0\)\s?)|(\s?))?([1-9]\d{1}\s?\d{3}\s?\d{2}\s?\d{2})$/;

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const urlRegex = /^(https?:\/\/|www\.)[^\s.]+\.[^\s]{2,}$/i;

const isMoreThan3Days = (isoDateString) => {
  const inputDate = new Date(Date.parse(isoDateString));
  const today = new Date();
  today.setHours(0, 0, 0, 0); // set time to midnight
  const threeDaysFromToday = new Date(
    today.getTime() + 3 * 24 * 60 * 60 * 1000
  );
  return inputDate > threeDaysFromToday;
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
  isMoreThan3Days,
};
