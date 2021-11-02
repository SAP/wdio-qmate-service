"use strict";
const { getFullDate } = require("./utils");
let calculatedDate;

const date = new Date();
date.setDate(date.getDate() - 1);

const { day, month, year } = getFullDate(date);

describe("date - getSpecific without any format ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getSpecific(date);
  });

  it("Verification", function () {
    common.assertion.expectEqual(calculatedDate.toDateString(), date.toDateString());
    common.assertion.expectUnequal(calculatedDate.toDateString(), (new Date()).toDateString());
  });
});

describe("date - getSpecific with format 'mm/dd/yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getSpecific(date, "mm/dd/yyyy");
  });

  it("Verification", function () {
    const fullDate = `${month}/${day}/${year}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getSpecific with format 'dd.mm.yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getSpecific(date, "dd.mm.yyyy");
  });

  it("Verification", function () {
    const fullDate = `${day}.${month}.${year}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getSpecific with format 'yyyymmdd' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getSpecific(date, "yyyymmdd");
  });

  it("Verification", function () {
    const fullDate = `${year}${month}${day}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});

describe("date - getSpecific with format 'yyyy/mm/dd' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.getSpecific(date, "yyyy/mm/dd");
  });

  it("Verification", function () {
    const fullDate = `${year}/${month}/${day}`;
    common.assertion.expectEqual(calculatedDate, fullDate);
  });
});