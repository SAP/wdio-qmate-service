"use strict";

describe("date - calculate - without parameters", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculate();
  });

  it("Verification", function() {
    const dateExp = new Date();
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - 'today'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculate("today");
  });

  it("Verification", function() {
    const dateExp = new Date();
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - 'tomorrow'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculate("tomorrow");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setDate(dateExp.getDate() + 1);
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - 'nextMonth'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculate("nextMonth");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() + 1);
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - 'previousMonth'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculate("previousMonth");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() - 1);
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - 'nextYear'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculate("nextYear");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setFullYear(dateExp.getFullYear() + 1);
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - 'previousYear'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculate("previousYear");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setFullYear(dateExp.getFullYear() - 1);
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - 'null'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculate(null);
  });

  it("Verification", function() {
    const dateExp = new Date();
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - 'undefined'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculate();
  });

  it("Verification", function() {
    const dateExp = new Date();
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - specific", function() {
  let dateAct;
  const dateString = "2022, 3, 13";

  it("Execution", function() {
    dateAct = common.date.calculate(dateString);
  });

  it("Verification", function() {
    const dateExp = new Date(dateString);
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - 'today' + 'mm/dd/yyyy'", function() {
  let dateAct;
  const format = "mm/dd/yyyy";

  it("Execution", function() {
    dateAct = common.date.calculate("today", format);
  });

  it("Verification", function() {
    const dateExp = util.formatter.formatDate(new Date(), format);
    verifyDate(dateAct, dateExp);
  });
});

describe("date - calculate - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculate(false)).toThrowError("Function 'calculate' failed: Please provide a valid date string as first argument.");
  });
});

function verifyDate(dateAct, dateExp) {
  dateAct = dateAct.toString().slice(0, 21);
  dateExp = dateAct.toString().slice(0, 21);
  common.assertion.expectEqual(dateAct, dateExp);
}