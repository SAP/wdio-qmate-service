"use strict";
const { getFullDate } = require("./utils");
let dateFromTypo;
let calculatedDate;

describe("date - getNextMonth with wrong formats", function () {
  let withReversedSlash;
  let withDoubleDots;
  let withBackSpaces;
  let withStrangeDays;

  it("Execution and Verification", function () {
    // expect e.g "2020-12-26T19:18:43.787Z"
    withReversedSlash = ui5.common.date.getNextMonth("mm\\dd\\yyyy");
    withDoubleDots = ui5.common.date.getNextMonth("mm..dd..yyyy");
    withBackSpaces = ui5.common.date.getNextMonth("mm dd yyyy");
    withStrangeDays = ui5.common.date.getNextMonth("xx/zz/yyyy");
    ui5.common.assertion.expectDefined(withReversedSlash);
    ui5.common.assertion.expectDefined(Date.parse(withReversedSlash));
    ui5.common.assertion.expectEqual(withReversedSlash.toString(), withDoubleDots.toString());
    ui5.common.assertion.expectEqual(withDoubleDots.toString(), withBackSpaces.toString());
    ui5.common.assertion.expectEqual(withBackSpaces.toString(), withStrangeDays.toString());

    expect(() => ui5.common.date.getNextMonth(true)).toThrow(/format.toLowerCase is not a function/);
    expect(() => ui5.common.date.getNextMonth(-1)).toThrow(/format.toLowerCase is not a function/);
  });
});

describe("date - getNextMonth without format ", function () {
  it("Execution", function () {
    // expect e.g. "Sat Dec 26 2020"
    calculatedDate = ui5.common.date.getNextMonth();
  });

  it("Verification", async function () {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    ui5.common.assertion.expectEqual(calculatedDate.toDateString(), date.toDateString());
    ui5.common.assertion.expectUnequal(calculatedDate.toDateString(), (new Date()).toDateString());
  });
});

describe("date - getNextMonth with format 'mm/dd/yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.getNextMonth("mm/dd/yyyy");
  });

  it("Verification", function () {
    // Happy case
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    let { day, month, year } = getFullDate(date);
    ui5.common.assertion.expectEqual(calculatedDate, `${month}/${day}/${year}`);

    // Wrong month - previous month
    date.setMonth(date.getMonth() - 1);
    ({ day, month, year } = getFullDate(date));
    ui5.common.assertion.expectUnequal(calculatedDate, `${day}/${month}/${year}`);
  });
});

describe("date - getNextMonth with format 'dd.mm.yyyy' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.getNextMonth("dd.mm.yyyy");
    dateFromTypo = ui5.common.date.getNextMonth("dd.mmyyyy");
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const { day, month, year } = getFullDate(date);

    ui5.common.assertion.expectEqual(calculatedDate, `${day}.${month}.${year}`);
    ui5.common.assertion.expectUnequal(dateFromTypo, `${day}.${month}.${year}`);
  });
});

describe("date - getNextMonth with format 'yyyymmdd' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.getNextMonth("yyyymmdd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const { day, month, year } = getFullDate(date);
    ui5.common.assertion.expectEqual(calculatedDate, `${year}${month}${day}`);
  });
});

describe("date - getNextMonth with format 'yyyy/mm/dd' ", function () {
  it("Preparation", function () { });

  it("Execution", function () {
    calculatedDate = ui5.common.date.getNextMonth("yyyy/mm/dd");
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    ui5.common.assertion.expectEqual(calculatedDate, fullDate);
  });
});