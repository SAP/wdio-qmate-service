"use strict";

const url = "https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html";
describe("assertion - expectUrlToBe - 'openui5.....'", function () {

  it("Preparation", async function () {
    await browser.navigateTo(url);
  });

  it("Execution and Verification", async function () {
    await common.assertion.expectUrlToBe(url);
  });
});

describe("assertion - expectUrlToBe - error case", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://qs9-715.wdf.sap.corp/ui");
  });

  it("Execution and Verification", async function () {
    await expect(common.assertion.expectUrlToBe())
      .rejects.toThrow(/Expect\w+|\d+undefined\w+|\d+Received\w+|\d+"https:\/\/qs9-715.wdf.sap.corp\/ui"/);

    await expect(common.assertion.expectUrlToBe("https://qs9-715.wdf.sap.corp"))
      .rejects.toThrow(/Expect\w+|\d+"https:\/\/qs9-715.wdf.sap.corp"\w+|\d+Received\w+|\d+"https:\/\/qs9-715.wdf.sap.corp\/ui"/);
  });
});