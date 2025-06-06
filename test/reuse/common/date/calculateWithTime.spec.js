"use strict";

describe("date - calculateWithTime - without parameters", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime();
  });

  it("Verification", function() {
    const dateExp = new Date();
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'today' - without time", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("today");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setHours(0, 0, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'today' - '10:00'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("today", "10:00");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setHours(10, 0, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'today' - '10:00:30'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("today", "10:00:30");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setHours(10, 0, 30, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'today' - '10'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("today", "10");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setHours(10, 0, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'tomorrow' - without parameters", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("tomorrow");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setDate(dateExp.getDate() + 1);
    dateExp.setHours(0, 0, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'tomorrow' - '10:00'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("tomorrow", "10:00");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setDate(dateExp.getDate() + 1);
    dateExp.setHours(10, 0, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'previousMonth' - '10:00:30'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("previousMonth", "10:00:30");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() - 1);
    dateExp.setHours(10, 0, 30, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'nextYear' - '15:20:40'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("nextYear", "15:20:40");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setFullYear(dateExp.getFullYear() + 1);
    dateExp.setHours(15, 20, 40, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

function verifyDateWithTime(dateAct, dateExp) {
  common.assertion.expectEqual(dateAct.getFullYear(), dateExp.getFullYear());
  common.assertion.expectEqual(dateAct.getMonth(), dateExp.getMonth());
  common.assertion.expectEqual(dateAct.getDate(), dateExp.getDate());
  common.assertion.expectEqual(dateAct.getHours(), dateExp.getHours());
  common.assertion.expectEqual(dateAct.getMinutes(), dateExp.getMinutes());
  common.assertion.expectEqual(dateAct.getSeconds(), dateExp.getSeconds());
}
