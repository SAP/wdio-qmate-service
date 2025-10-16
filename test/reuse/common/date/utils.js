exports.getFullDate = function getFullDate(date) {
  const month = (date.getMonth() + 1) / 10 >= 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() / 10 >= 1 ? date.getDate() : `0${date.getDate()}`;
  const year = date.getFullYear();
  return { day, month, year };
};

exports.verifyDateWithTime = function (dateAct, dateExp) {
  common.assertion.expectEqual(dateAct.getFullYear(), dateExp.getFullYear());
  common.assertion.expectEqual(dateAct.getMonth(), dateExp.getMonth());
  common.assertion.expectEqual(dateAct.getDate(), dateExp.getDate());
  common.assertion.expectEqual(dateAct.getHours(), dateExp.getHours());
  common.assertion.expectEqual(dateAct.getMinutes(), dateExp.getMinutes());
  common.assertion.expectEqual(dateAct.getSeconds(), dateExp.getSeconds());
};
