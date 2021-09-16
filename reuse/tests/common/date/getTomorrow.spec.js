"use strict";
const { getFullDate } = require("./utils");
let arrivedDate;

describe("date - getTomorrow without any format ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getTomorrow();
  });

  it("Verification", function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    common.assertion.expectEqual(arrivedDate.toDateString(), date.toDateString());
    common.assertion.expectUnequal(arrivedDate.toDateString(), (new Date()).toDateString());
  });
});

describe("date - getTomorrow with format 'mm/dd/yyyy' ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getTomorrow("mm/dd/yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${month}/${day}/${year}`;
    common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getTomorrow with format 'dd.mm.yyyy' ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getTomorrow("dd.mm.yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${day}.${month}.${year}`;
    common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getTomorrow with format 'yyyymmdd' ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getTomorrow("yyyymmdd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}${month}${day}`;
    common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getTomorrow with format 'yyyy/mm/dd' ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getTomorrow("yyyy/mm/dd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    common.assertion.expectEqual(arrivedDate, fullDate);
  });
});