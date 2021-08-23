"use strict";
const { getFullDate } = require("./utils");
let arrivedDate;

describe("date - getTomorrow without any format ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getTomorrow();
  });

  it("Verification", async function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    await ui5.common.assertion.expectEqual(arrivedDate.toDateString(), date.toDateString());
    await ui5.common.assertion.expectUnequal(arrivedDate.toDateString(), (new Date()).toDateString());
  });
});

describe("date - getTomorrow with format 'mm/dd/yyyy' ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getTomorrow("mm/dd/yyyy");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${month}/${day}/${year}`;
    await ui5.common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getTomorrow with format 'dd.mm.yyyy' ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getTomorrow("dd.mm.yyyy");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${day}.${month}.${year}`;
    await ui5.common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getTomorrow with format 'yyyymmdd' ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getTomorrow("yyyymmdd");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}${month}${day}`;
    await ui5.common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getTomorrow with format 'yyyy/mm/dd' ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getTomorrow("yyyy/mm/dd");
  });

  it("Verification", async function () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    await ui5.common.assertion.expectEqual(arrivedDate, fullDate);
  });
});