"use strict";

const { verifyDateWithTime } = require("./utils");

// =================================== VALID CASES ===================================
describe("date - calculateWithTime - without parameters", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime();
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setHours(0, 0, 0, 0);
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

describe("date - calculateWithTime - 'nextMonth' - '9:15 AM'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("nextMonth", "9:15 AM");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() + 1);
    dateExp.setHours(9, 15, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'nextMonth' - '9:15 am' ('am' in lowercase')", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("nextMonth", "9:15 am");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() + 1);
    dateExp.setHours(9, 15, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'nextMonth' - '9:15 PM'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("nextMonth", "9:15 PM");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() + 1);
    dateExp.setHours(21, 15, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'nextMonth' - '9:15 pm' ('pm' in lowercase)", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("nextMonth", "9:15 pm");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() + 1);
    dateExp.setHours(21, 15, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'previousMonth' - '12 AM'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("previousMonth", "12 AM");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() - 1);
    dateExp.setHours(0, 0, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'previousMonth' - '12:15 AM'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("previousMonth", "12:15 AM");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() - 1);
    dateExp.setHours(0, 15, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'previousMonth' - '01:05 AM'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("previousMonth", "01:05 AM");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() - 1);
    dateExp.setHours(1, 5, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'previousMonth' - '12 PM'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("previousMonth", "12 PM");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() - 1);
    dateExp.setHours(12, 0, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculate - 'today' + format 'mm/dd/yyyy HH:mm:ss'", function() {
  let dateAct;
  const format = "mm/dd/yyyy HH:mm:ss";

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("previousMonth", "12 PM", format);
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() - 1);
    dateExp.setHours(12, 0, 0, 0);
    const dateExpFormatted = util.formatter.formatDateWithTime(dateExp, format);
    common.assertion.expectEqual(dateAct, dateExpFormatted);
  });
});

describe("date - calculateWithTime - 'previousMonth' - 'startOfDay'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("previousMonth", "startOfDay");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() - 1);
    dateExp.setHours(0, 0, 0, 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'tomorrow' - 'currentTime'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("tomorrow", "currentTime");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setDate(dateExp.getDate() + 1);
    dateExp.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), 0);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'nextYear' - 'endOfDay'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("nextYear", "endOfDay");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setFullYear(dateExp.getFullYear() + 1);
    dateExp.setHours(23, 59, 59, 999);
    verifyDateWithTime(dateAct, dateExp);
  });
});

describe("date - calculateWithTime - 'tomorrow' - 'endOfDay' + format 'mm/dd/yyyy HH:mm:ss'", function() {
  let dateAct;

  it("Execution", function() {
    dateAct = common.date.calculateWithTime("tomorrow", "endOfDay", "mm/dd/yyyy HH:mm:ss");
  });

  it("Verification", function() {
    const dateExp = new Date();
    dateExp.setDate(dateExp.getDate() + 1);
    dateExp.setHours(23, 59, 59, 999);
    const dateExpFormatted = util.formatter.formatDateWithTime(dateExp, "mm/dd/yyyy HH:mm:ss");
    common.assertion.expectEqual(dateAct, dateExpFormatted);
  });
});

// =================================== ERROR CASES ===================================
describe("date - calculateWithTime - 'nextYear' - 'invalid-time' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextYear", "invalid-time")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});

describe("date - calculateWithTime - 'nextYear' - 'invalid-time (15:78:21)' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextYear", "15:78:21")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});

describe("date - calculateWithTime - 'invalid-date' - '15:23:23' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("invalid-date", "15:23:23")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid date string as first argument.");
  });
});

describe("date - calculateWithTime - 'nextMonth' - '21:15 PM' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextMonth", "21:15 PM")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});

describe("date - calculateWithTime - 'nextMonth' - 'AM' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextMonth", "AM")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});

describe("date - calculateWithTime - 'nextMonth' - 'PM' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextMonth", "PM")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});

describe("date - calculateWithTime - 'nextMonth' - '12 AM/PM' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextMonth", "12 AM/PM")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});

describe("date - calculateWithTime - 'nextMonth' - '13:15 AM' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextMonth", "21:15 AM")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});

describe("date - calculateWithTime - 'previousMonth' - '-5:40:40' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextMonth", "-5:40:40")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});

describe("date - calculateWithTime - 'previousMonth' - '20:-40:30' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextMonth", "-5:40:40")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});

describe("date - calculateWithTime - 'previousMonth' - '20:40:-30' - error", function() {
  it("Execution & Verification", function() {
    expect(() => common.date.calculateWithTime("nextMonth", "-5:40:40")).toThrowError("Function 'calculateWithTime' failed: Please provide a valid time string as second argument.");
  });
});
