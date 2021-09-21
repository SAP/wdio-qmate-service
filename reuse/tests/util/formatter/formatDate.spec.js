"use strict";

describe("formatter - formatDate - 'mm/dd/yyyy'", function () {

  let formattedDate;

  it("Execution", async function () {
    const date = new Date(2020, 0, 17);
    formattedDate = util.formatter.formatDate(date, "mm/dd/yyyy");
  });

  it("Verification", async function () {
    const valueAct = formattedDate;
    const valueExp = "01/17/2020";
    common.assertion.expectEqual(valueAct, valueExp);
  });

});

describe("formatter - formatDate - 'dd.mm.yyyy'", function () {

  let formattedDate;

  it("Execution", async function () {
    const date = new Date(2020, 0, 17);
    formattedDate = util.formatter.formatDate(date, "dd.mm.yyyy");
  });

  it("Verification", async function () {
    const valueAct = formattedDate;
    const valueExp = "17.01.2020";
    common.assertion.expectEqual(valueAct, valueExp);
  });

});

describe("formatter - formatDate - 'dd/mm/yyyy'", function () {

  let formattedDate;

  it("Execution", async function () {
    const date = new Date(2020, 0, 17);
    formattedDate = util.formatter.formatDate(date, "dd/mm/yyyy");
  });

  it("Verification", async function () {
    const valueAct = formattedDate;
    const valueExp = "17/01/2020";
    common.assertion.expectEqual(valueAct, valueExp);
  });

});

describe("formatter - formatDate - 'yyyymmdd'", function () {

  let formattedDate;

  it("Execution", async function () {
    const date = new Date(2020, 0, 17);
    formattedDate = util.formatter.formatDate(date, "yyyymmdd");
  });

  it("Verification", async function () {
    const valueAct = formattedDate;
    const valueExp = "20200117";
    common.assertion.expectEqual(valueAct, valueExp);
  });

});

describe("formatter - formatDate - 'yyyy/mm/dd'", function () {

  let formattedDate;

  it("Execution", async function () {
    const date = new Date(2020, 0, 17);
    formattedDate = util.formatter.formatDate(date, "yyyy/mm/dd");
  });

  it("Verification", async function () {
    const valueAct = formattedDate;
    const valueExp = "2020/01/17";
    common.assertion.expectEqual(valueAct, valueExp);
  });

});

describe("formatter - formatDate - 'datetime'", function () {

  let formattedDate;

  it("Execution", async function () {
    const date = new Date(2020, 0, 17);
    formattedDate = util.formatter.formatDate(date, "datetime");
  });

  it("Verification", async function () {
    const valueAct = formattedDate;
    const valueExp = "datetime'2020-01-17T00:00:00'";
    common.assertion.expectEqual(valueAct, valueExp);
  });

});