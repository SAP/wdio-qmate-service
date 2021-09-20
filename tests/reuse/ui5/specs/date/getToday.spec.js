"use strict";
const { getFullDate } = require("./utils");

let arrivedDate;

describe("date - getToday without any format ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getToday();
  });

  it("Verification", async function () {
    const date = new Date();
    await ui5.common.assertion.expectEqual(arrivedDate.toDateString(), date.toDateString());
  });
});

describe("date - getToday  without any format (unhappy case)", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getToday();
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectUnequal(arrivedDate.toDateString(), (new Date("10/09/2020")).toDateString());
  });
});

describe("date - getToday with format 'mm/dd/yyyy' ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getToday("mm/dd/yyyy");
  });

  it("Verification", async function () {
    const date = new Date();
    const { day, month, year } = getFullDate(date);

    const fullDate = `${month}/${day}/${year}`;
    await ui5.common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getToday with format 'dd.mm.yyyy' ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getToday("dd.mm.yyyy");
  });

  it("Verification", async function () {
    const date = new Date();
    const { day, month, year } = getFullDate(date);
    const fullDate = `${day}.${month}.${year}`;
    await ui5.common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getToday with format 'yyyymmdd' ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getToday("yyyymmdd");
  });

  it("Verification", async function () {
    const date = new Date();
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}${month}${day}`;
    await ui5.common.assertion.expectEqual(arrivedDate, fullDate);
  });
});

describe("date - getToday with format 'yyyy/mm/dd' ", function () {
  it("Execution", async function () {
    arrivedDate = await ui5.common.date.getToday("yyyy/mm/dd");
  });

  it("Verification", async function () {
    const date = new Date();
    const { day, month, year } = getFullDate(date);
    const fullDate = `${year}/${month}/${day}`;
    await ui5.common.assertion.expectEqual(arrivedDate, fullDate);
  });
});