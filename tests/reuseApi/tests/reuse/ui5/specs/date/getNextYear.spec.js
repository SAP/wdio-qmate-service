"use strict";
const { getFullDate } = require("./utils");
let calculatedDate;

describe("date - getNextYear without any format ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.getNextYear();
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    ui5.common.assertion.expectEqual(calculatedDate.toDateString(), date.toDateString());
    ui5.common.assertion.expectUnequal(calculatedDate.toDateString(), (new Date()).toDateString());
  });
});

describe("date - getNextYear with format 'mm/dd/yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.getNextYear("mm/dd/yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${month}/${day}/${year}`;
    ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getNextYear with format 'dd.mm.yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.getNextYear("dd.mm.yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${day}.${month}.${year}`;
    ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getNextYear with format 'yyyymmdd' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.getNextYear("yyyymmdd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}${month}${day}`;
    ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getNextYear with format 'yyyy/mm/dd' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.getNextYear("yyyy/mm/dd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});