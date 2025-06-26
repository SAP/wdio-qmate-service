"use strict";

const { verifyDateWithTime } = require("./utils");

describe("date - getCurrentDateAndTime", () => {
  let dateAct;

  it("Execution", () => {
    dateAct = common.date.getCurrentDateAndTime();
  });

  it("Verification", () => {
    const dateExp = new Date();
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - getCurrentDateAndTime with format ('mm/dd/yyyy HH:mm:ss')", () => {
  let dateAct;
  const format = "mm/dd/yyyy HH:mm:ss";

  it("Execution", () => {
    dateAct = common.date.getCurrentDateAndTime("mm/dd/yyyy HH:mm:ss");
  });

  it("Verification", () => {
    const dateExp = new Date();
    const dateExpFormatted = util.formatter.formatDateWithTime(dateExp, format);
    common.assertion.expectEqual(dateAct, dateExpFormatted);
  });
});
