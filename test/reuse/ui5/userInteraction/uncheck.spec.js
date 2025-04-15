const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - uncheck - checkbox (checked)", function () {
  const selector = {
    elementProperties: {
      viewName: "sap.m.sample.CheckBox.CheckBoxGroup",
      metadata: "sap.m.CheckBox",
      text: "Option 2"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.CheckBox/sample/sap.m.sample.CheckBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.userInteraction.uncheck(selector, 0, 60000);
  });

  it("Verification", async function () {
    await ui5.assertion.expectAttributeToBe(selector, "selected", false);
  });
});

describe("userInteraction - uncheck - checkbox (unchecked)", function () {
  const selector = {
    elementProperties: {
      viewName: "sap.m.sample.CheckBox.CheckBoxGroup",
      metadata: "sap.m.CheckBox",
      text: "Option b"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.CheckBox/sample/sap.m.sample.CheckBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.userInteraction.uncheck(selector, 0, 60000);
  });

  it("Verification", async function () {
    await ui5.assertion.expectAttributeToBe(selector, "selected", false);
  });
});

describe("userInteraction - uncheck - checkbox (error)", function () {
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
    await expect(ui5.userInteraction.uncheck(selector, 0, 60000)).rejects.toThrow(/Function 'uncheck' failed with:/);
  });
});
