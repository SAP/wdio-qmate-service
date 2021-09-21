"use strict";
const { getFullDate } = require("./utils");
let calculatedDate;
describe("date - getPreviousMonth without any format ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousMonth();
  });

  it("Verification", async function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    await ui5.common.assertion.expectEqual(calculatedDate.toDateString(), date.toDateString());
    await ui5.common.assertion.expectUnequal(calculatedDate.toDateString(), (new Date()).toDateString());
  });
});

describe("date - getPreviousMonth with format 'mm/dd/yyyy' ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousMonth("mm/dd/yyyy");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${month}/${day}/${year}`;
    await ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousMonth with format 'dd.mm.yyyy' ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousMonth("dd.mm.yyyy");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${day}.${month}.${year}`;
    await ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousMonth with format 'yyyymmdd' ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousMonth("yyyymmdd");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}${month}${day}`;
    await ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousMonth with format 'yyyy/mm/dd' ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousMonth("yyyy/mm/dd");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    await ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});