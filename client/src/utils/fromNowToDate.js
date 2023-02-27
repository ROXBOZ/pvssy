export function fromNowToDate(isoDate) {
  const dateObject = new Date(isoDate);
  const eventDateInMilli = dateObject.getTime();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todayStartinMilli = todayStart.getTime();
  const todayEndinMilli = todayEnd.getTime();

  return {
    eventDateInMilli,
    todayStartinMilli,
    todayEndinMilli,
  };
}
