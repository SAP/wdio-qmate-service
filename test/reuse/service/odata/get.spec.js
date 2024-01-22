"use strict";

describe("odata - get", function () {
  let srv;
  let res;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution", async function () {
    res = await service.odata.get(srv, "People", { UserName: "willieashmore", LastName: "Ashmore" });
  });

  it("Verification", async function () {
    await common.assertion.expectDefined(res);
  });
});

describe("odata - get - wrong value", function () {
  let srv;
  let res;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution", async function () {
    res = await service.odata.get(srv, "People", { UserName: "wrongvalue" });
  });

  it("Verification", async function () {
    await common.assertion.expectTrue(res === null);
  });
});

describe("odata - get - wrong key", function () {
  let srv;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution and Verification", async function () {
    await expect(service.odata.get(srv, "People", { WrongKey: "SomeValue" })).rejects.toThrow(/Key property UserName is not defined/);
  });
});

describe("odata - get - wrong entity set", function () {
  let srv;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution and Verification", async function () {
    await expect(service.odata.get(srv, "WrongEntitySet", { UserName: "willieashmore" })).rejects.toThrow(/Entity Set .* not found in service./);
  });
});

describe("odata - get with query parameters", function () {
  let srv;
  let res;
  const numberOfResultsToFetch = 3;
  it("Preparation", async function () {
    srv = await service.odata.init(browser.config.baseUrl, "", "", false, {}, "none");
  });

  it("Execution", async function () {
    res = await service.odata.get(srv, "People", null, false, null, { $top: numberOfResultsToFetch, $skip: 3 });
  });

  it("Verification", async function () {
    common.assertion.expectDefined(res);
    common.assertion.expectEqual(res.length, numberOfResultsToFetch);
  });
});
