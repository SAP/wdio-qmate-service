"use strict";
const { getFullDate } = require("./utils");
let calculatedDate;

describe("date - getPreviousYear without any format ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousYear();
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    common.assertion.expectEqual(calculatedDate.toDateString(), date.toDateString());
    common.assertion.expectUnequal(calculatedDate.toDateString(), (new Date()).toDateString());
  });
});

describe("date - getPreviousYear with format 'mm/dd/yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousYear("mm/dd/yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${month}/${day}/${year}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousYear with format 'dd.mm.yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousYear("dd.mm.yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${day}.${month}.${year}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousYear with format 'yyyymmdd' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousYear("yyyymmdd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}${month}${day}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousYear with format 'yyyy/mm/dd' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousYear("yyyy/mm/dd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});