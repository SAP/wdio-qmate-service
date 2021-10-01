exports.getFullDate = function getFullDate(date) {
  const month = (date.getMonth() + 1) / 10 >= 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() / 10 >= 1 ? date.getDate() : `0${date.getDate()}`;
  const year = date.getFullYear();
  return { day, month, year };
};