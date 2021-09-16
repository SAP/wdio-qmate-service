"use strict";
let calculatedDate;
let dateFromTypo;
let today;
let nextMonth;
let nextYear;

describe("date - calculateDate without any parameters ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.calculateDate();
  });

  it("Verification", function () {
    const date = new Date();
    ui5.common.assertion.expectDefined(calculatedDate);
    ui5.common.assertion.expectEqual(calculatedDate.toDateString(), date.toDateString());
  });
});

describe("date - calculateDate with null/undefined/false parameters", function () {
  it("Execution and Verification", function () {
    expect(ui5.common.date.calculateDate(null).getDate()).toBe(calculatedDate.getDate());
    expect(ui5.common.date.calculateDate(undefined).getDate()).toBe(calculatedDate.getDate());
    expect(() => ui5.common.date.calculateDate(false)).toThrowError("Function 'getSpecificDate' failed: Please provide a date string ('2020, 0, 17') as first argument.");
    expect(ui5.common.date.calculateDate(true).toString()).toBe("Invalid Date");
  });
});

describe("date - calculateDate with parameter 'today' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.calculateDate("today").toString();
    dateFromTypo = ui5.common.date.calculateDate("tobay").toString(); // typo: tobay instead of today
  });

  it("Verification", function () {
    const date = new Date();
    const dateString = date.toString();

    ui5.common.assertion.expectEqual(calculatedDate.toString(), date.toString());
    ui5.common.assertion.expectUnequal(dateFromTypo, dateString);
  });
});

describe("date - calculateDate with parameter 'tomorrow' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.calculateDate("tomorrow").toString();
    today = ui5.common.date.calculateDate("today").toString();
    dateFromTypo = ui5.common.date.calculateDate("tomorow").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const dateString = date.toString();
    ui5.common.assertion.expectEqual(calculatedDate, dateString);
    ui5.common.assertion.expectUnequal(dateFromTypo, dateString);
    ui5.common.assertion.expectUnequal(today, dateString);
  });
});

describe("date - calculateDate with parameter 'nextMonth' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.calculateDate("nextMonth").toString();
    today = ui5.common.date.calculateDate("today").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const dateString = date.toString();
    ui5.common.assertion.expectEqual(calculatedDate, dateString);
    ui5.common.assertion.expectUnequal(today, dateString);
  });
});

describe("date - calculateDate with parameter 'previousMonth' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.calculateDate("previousMonth").toString();
    nextMonth = ui5.common.date.calculateDate("nextMonth").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const dateString = date.toString();
    ui5.common.assertion.expectEqual(calculatedDate, dateString);
    ui5.common.assertion.expectUnequal(calculatedDate, nextMonth);
  });
});

describe("date - calculateDate with parameter 'previousMonth' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.calculateDate("previousMonth").toString();
    nextMonth = ui5.common.date.calculateDate("nextMonth").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const dateString = date.toString();
    ui5.common.assertion.expectEqual(calculatedDate, dateString);
    ui5.common.assertion.expectUnequal(calculatedDate, nextMonth);
  });
});

describe("date - calculateDate with parameter 'nextYear' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.calculateDate("nextYear").toString();
    nextMonth = ui5.common.date.calculateDate("nextMonth").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const dateString = date.toString();
    ui5.common.assertion.expectEqual(calculatedDate, dateString);
    ui5.common.assertion.expectUnequal(calculatedDate, nextMonth);
  });
});

describe("date - calculateDate with parameter 'previousYear' ", function () {
  it("Execution", function () {
    calculatedDate = ui5.common.date.calculateDate("previousYear").toString();
    nextYear = ui5.common.date.calculateDate("nextYear").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const dateString = date.toString();
    ui5.common.assertion.expectEqual(calculatedDate, dateString);
    ui5.common.assertion.expectUnequal(calculatedDate, nextYear);
  });
});

it("Verification", function () {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  const dateString = date.toString();
  ui5.common.assertion.expectEqual(calculatedDate, dateString);
  ui5.common.assertion.expectUnequal(calculatedDate, nextYear);
});

function getFullDateAsStringFromDate(date) {
  const month = (date.getMonth() + 1) / 10 >= 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() / 10 >= 1 ? date.getDate() : `0${date.getDate()}`;
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}