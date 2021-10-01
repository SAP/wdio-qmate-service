"use strict";

describe("formatter - extractNumberFromString - without index", function () {

  let extracted;

  it("Execution", async function () {
    extracted = await util.formatter.extractNumberFromString("prefixNR12345postfix");
  });

  it("Verification", async function () {
    const valueAct = extracted;
    const valueExp = "12345";
    await common.assertion.expectEqual(valueAct, valueExp);
  });

});

describe("formatter - extractNumberFromString - with index", function () {

  let extracted;

  it("Execution", async function () {
    const index = 1;
    extracted = await util.formatter.extractNumberFromString("first12345 someText second 20 abc", index);
  });

  it("Verification", async function () {
    const valueAct = extracted;
    const valueExp = "20";
    await common.assertion.expectEqual(valueAct, valueExp);
  });

});