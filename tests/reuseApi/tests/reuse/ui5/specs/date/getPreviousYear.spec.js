"use strict";
const { getFullDate } = require("./utils");
let calculatedDate;

describe("date - getPreviousYear without any format ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousYear();
  });

  it("Verification", async function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    await ui5.common.assertion.expectEqual(calculatedDate.toDateString(), date.toDateString());
    await ui5.common.assertion.expectUnequal(calculatedDate.toDateString(), (new Date()).toDateString());
  });
});

describe("date - getPreviousYear with format 'mm/dd/yyyy' ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousYear("mm/dd/yyyy");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${month}/${day}/${year}`;
    await ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousYear with format 'dd.mm.yyyy' ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousYear("dd.mm.yyyy");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${day}.${month}.${year}`;
    await ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousYear with format 'yyyymmdd' ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousYear("yyyymmdd");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}${month}${day}`;
    await ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousYear with format 'yyyy/mm/dd' ", function () {
  it("Execution", async function () {
    calculatedDate = await ui5.common.date.getPreviousYear("yyyy/mm/dd");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    await ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});