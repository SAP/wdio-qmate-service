"use strict";

describe("odata - getEntitySet", function () {
  let srv;
  let res;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution", async function () {
    res = await service.odata.getEntitySet(srv, "People");
  });

  it("Verification", async function () {
    await common.assertion.expectTrue(res.length > 0);
    await common.assertion.expectDefined(res[0].UserName);
  });
});

describe("odata - getEntitySet with selected fields", function () {
  let srv;
  let res;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution", async function () {
    res = await service.odata.getEntitySet(srv, "People", "", "FirstName,LastName");
  });

  it("Verification", async function () {
    await common.assertion.expectTrue(res.length > 0);
    await common.assertion.expectDefined(res[0].FirstName);
    await common.assertion.expectUndefined(res[0].UserName);
  });
});

describe("odata - getEntitySet with filter", function () {
  let srv;
  let resBudgetLow, resBudgetHigh;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution", async function () {
    resBudgetLow = await service.odata.getEntitySet(srv, "People", "Trips/any(d:d/Budget gt 3000)");
    resBudgetHigh = await service.odata.getEntitySet(srv, "People", "Trips/any(d:d/Budget gt 300000)");
  });

  it("Verification", async function () {
    await common.assertion.expectTrue(resBudgetLow.length > 0);
    await common.assertion.expectTrue(resBudgetHigh.length === 0);
  });
});

describe("odata - getEntitySet with params", function () {
  let srv;
  let res;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution", async function () {
    res = await service.odata.getEntitySet(srv, "People", "", "", { $top: 2 });
  });

  it("Verification", async function () {
    await common.assertion.expectTrue(res.length === 2);
  });
});

describe("odata - getEntitySet - wrong entity set", function () {
  let srv;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution and Verification", async function () {
    await expect(service.odata.getEntitySet(srv, "WrongEntitySet")).rejects.toThrow(/Entity Set .* not found in service./);
  });
});
