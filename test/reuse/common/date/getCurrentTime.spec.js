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
