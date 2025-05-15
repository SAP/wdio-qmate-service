const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - check - checkbox (unchecked)", function () {
  const selector = {
    elementProperties: {
      viewName: "sap.m.sample.CheckBox.CheckBoxGroup",
      metadata: "sap.m.CheckBox",
      text: "Option"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.CheckBox/sample/sap.m.sample.CheckBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.userInteraction.check(selector, 0, 60000);
  });

  it("Verification", async function () {
    await ui5.assertion.expectAttributeToBe(selector, "selected", true);
  });
});

describe("userInteraction - check - checkbox (checked)", function () {
  const selector = {
    elementProperties: {
      viewName: "sap.m.sample.CheckBox.CheckBoxGroup",
      metadata: "sap.m.CheckBox",
      text: "Option a"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.CheckBox/sample/sap.m.sample.CheckBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.userInteraction.check(selector, 0, 60000);
  });

  it("Verification", async function () {
    await ui5.assertion.expectAttributeToBe(selector, "selected", true);
  });
});

describe("userInteraction - check - checkbox (error)", function () {
  const selector = {
    elementProperties: {
      viewName: "sap.m.sample.CheckBox.CheckBoxGroup",
      metadata: "sap.m.CheckBox",
      text: "_______INVALID_______"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.CheckBox/sample/sap.m.sample.CheckBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.userInteraction.check(selector, 0, 60000)).rejects.toThrow(/Function 'check' failed with:/);
  });
});
