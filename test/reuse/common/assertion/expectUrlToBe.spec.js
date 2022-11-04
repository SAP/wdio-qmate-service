"use strict";

const url = "https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html";
describe("assertion - expectUrlToBe - 'openui5.....'", function () {

  it("Preparation", async function () {
    await browser.navigateTo(url);
  });

  it("Execution & Verification", async function () {
    await common.assertion.expectUrlToBe(url);
  });
});

describe("assertion - expectUrlToBe - error case", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://sap.com");
  });

  it("Execution & Verification", async function () {
    await expect(common.assertion.expectUrlToBe())
      .rejects.toThrow(/Expect\w+|\d+undefined\w+|\d+Received\w+|\d+"https:\/\/sap.com"/);

    await expect(common.assertion.expectUrlToBe("https://sap.com"))
      .rejects.toThrow(/Expect\w+|\d+"https:\/\/sap.com"\w+|\d+Received\w+|\d+"https:\/\/sap.com\/index"/);
  });
});