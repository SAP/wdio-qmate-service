"use strict";
const { getFullDate } = require("./utils");
let calculatedDate;
describe("date - getPreviousMonth without any format ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousMonth();
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    common.assertion.expectEqual(calculatedDate.toDateString(), date.toDateString());
    common.assertion.expectUnequal(calculatedDate.toDateString(), (new Date()).toDateString());
  });
});

describe("date - getPreviousMonth with format 'mm/dd/yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousMonth("mm/dd/yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${month}/${day}/${year}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousMonth with format 'dd.mm.yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousMonth("dd.mm.yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${day}.${month}.${year}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousMonth with format 'yyyymmdd' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousMonth("yyyymmdd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}${month}${day}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getPreviousMonth with format 'yyyy/mm/dd' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getPreviousMonth("yyyy/mm/dd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});