"use strict";
let calculatedDate;
let dateFromTypo;
let today;
let nextMonth;
let nextYear;

describe("date - calculate without any parameters ", function () {
  it("Execution", function () {
    calculatedDate = common.date.calculate();
  });

  it("Verification", function () {
    const date = new Date();
    common.assertion.expectDefined(calculatedDate);
    common.assertion.expectEqual(calculatedDate.toDateString(), date.toDateString());
  });
});

describe("date - calculate with null/undefined/false parameters", function () {
  it("Execution and Verification", function () {
    expect(common.date.calculate(null).getDate()).toBe(calculatedDate.getDate());
    expect(common.date.calculate(undefined).getDate()).toBe(calculatedDate.getDate());
    expect(() => common.date.calculate(false)).toThrowError("Function 'getSpecific' failed: Please provide a date string ('2020, 0, 17') as first argument.");
    expect(common.date.calculate(true).toString()).toBe("Invalid Date");
  });
});

describe("date - calculate with parameter 'today' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.calculate("today").toString();
    dateFromTypo = common.date.calculate("tobay").toString(); // typo: tobay instead of today
  });

  it("Verification", function () {
    const date = new Date();
    const dateString = date.toString();

    common.assertion.expectEqual(calculatedDate.toString(), date.toString());
    common.assertion.expectUnequal(dateFromTypo, dateString);
  });
});

describe("date - calculate with parameter 'tomorrow' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.calculate("tomorrow").toString();
    today = common.date.calculate("today").toString();
    dateFromTypo = common.date.calculate("tomorow").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const dateString = date.toString();
    common.assertion.expectEqual(calculatedDate, dateString);
    common.assertion.expectUnequal(dateFromTypo, dateString);
    common.assertion.expectUnequal(today, dateString);
  });
});

describe("date - calculate with parameter 'nextMonth' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.calculate("nextMonth").toString();
    today = common.date.calculate("today").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const dateString = date.toString();
    common.assertion.expectEqual(calculatedDate, dateString);
    common.assertion.expectUnequal(today, dateString);
  });
});

describe("date - calculate with parameter 'previousMonth' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.calculate("previousMonth").toString();
    nextMonth = common.date.calculate("nextMonth").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const dateString = date.toString();
    common.assertion.expectEqual(calculatedDate, dateString);
    common.assertion.expectUnequal(calculatedDate, nextMonth);
  });
});

describe("date - calculate with parameter 'previousMonth' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.calculate("previousMonth").toString();
    nextMonth = common.date.calculate("nextMonth").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const dateString = date.toString();
    common.assertion.expectEqual(calculatedDate, dateString);
    common.assertion.expectUnequal(calculatedDate, nextMonth);
  });
});

describe("date - calculate with parameter 'nextYear' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.calculate("nextYear").toString();
    nextMonth = common.date.calculate("nextMonth").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const dateString = date.toString();
    common.assertion.expectEqual(calculatedDate, dateString);
    common.assertion.expectUnequal(calculatedDate, nextMonth);
  });
});

describe("date - calculate with parameter 'previousYear' ", function () {
  it("Execution", function () {
    calculatedDate = common.date.calculate("previousYear").toString();
    nextYear = common.date.calculate("nextYear").toString();
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const dateString = date.toString();
    common.assertion.expectEqual(calculatedDate, dateString);
    common.assertion.expectUnequal(calculatedDate, nextYear);
  });

  it("Verification", function () {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const dateString = date.toString();
    common.assertion.expectEqual(calculatedDate, dateString);
    common.assertion.expectUnequal(calculatedDate, nextYear);
  });
});


function getFullDateAsStringFromDate(date) {
  const month = (date.getMonth() + 1) / 10 >= 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() / 10 >= 1 ? date.getDate() : `0${date.getDate()}`;
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}