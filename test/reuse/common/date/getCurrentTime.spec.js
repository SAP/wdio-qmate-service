"use strict";

const { verifyDateWithTime } = require("./utils");

describe("date - getCurrentTime", () => {
  let dateAct;

  it("Execution", () => {
    dateAct = common.date.getCurrentTime();
  });

  it("Verification", () => {
    const dateExp = new Date();
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - getCurrentTime with format ('mm/dd/yyyy HH:mm:ss')", () => {
  let dateAct;
  const format = "mm/dd/yyyy HH:mm:ss";

  it("Execution", () => {
    dateAct = common.date.getCurrentTime("mm/dd/yyyy HH:mm:ss");
  });

  it("Verification", () => {
    const dateExp = new Date();
    const dateExpFormatted = util.formatter.formatDateWithTime(dateExp, format);
    common.assertion.expectEqual(dateAct, dateExpFormatted);
  });
});
