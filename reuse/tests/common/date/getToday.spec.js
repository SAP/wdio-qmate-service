"use strict";
const { getFullDate } = require("./utils");

let arrivedDate;

describe("date - getToday without any format ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getToday();
  });

  it("Verification", function () {
    const date = new Date();
    common.assertion.expectEqual(arrivedDate.toDateString(), date.toDateString());
  });
});

describe("date - getToday  without any format (unhappy case)", function () {
  it("Execution", function () {
    arrivedDate = common.date.getToday();
  });

  it("Verification", function () {
    common.assertion.expectUnequal(arrivedDate.toDateString(), (new Date("10/09/2020")).toDateString());
  });
});

describe("date - getToday with format 'mm/dd/yyyy' ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getToday("mm/dd/yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    const { day, month, year } = getFullDate(date);

    const fullDate = `${month}/${day}/${year}`;
    common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getToday with format 'dd.mm.yyyy' ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getToday("dd.mm.yyyy");
  });

  it("Verification", function () {
    const date = new Date();
    const { day, month, year } = getFullDate(date);
    const fullDate = `${day}.${month}.${year}`;
    common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getToday with format 'yyyymmdd' ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getToday("yyyymmdd");
  });

  it("Verification", function () {
    const date = new Date();
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}${month}${day}`;
    common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getToday with format 'yyyy/mm/dd' ", function () {
  it("Execution", function () {
    arrivedDate = common.date.getToday("yyyy/mm/dd");
  });

  it("Verification", function () {
    const date = new Date();
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    common.assertion.expectEqual(arrivedDate, fullDate);
  });
});