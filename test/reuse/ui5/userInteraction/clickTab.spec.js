const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - clickTab - simple tab", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/api/sap.m.IconTabBar");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.SubApiDetail",
        metadata: "sap.m.IconTabFilter",
        text: "Properties"
      }
    };
    const index = 0;
    const timeout = 30000;
    await ui5.userInteraction.clickTab(selector, index, timeout);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.SubApiDetail",
        metadata: "sap.m.Label",
        text: "Show borrowed properties"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });
});

describe("userInteraction - clickTab - multiple select values", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/api/sap.m.IconTabBar");
    await util.browser.refresh();
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.SubApiDetail",
        metadata: "sap.m.IconTabFilter",
        text: "Events"
      }
    };
    await ui5.userInteraction.clickTab(selector);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.SubApiDetail",
        metadata: "sap.ui.documentation.ObjectPageSubSection",
        title: "Summary"
      },
      ancestorProperties: {
        metadata: "sap.uxap.ObjectPageSection",
        viewName: "sap.ui.documentation.sdk.view.SubApiDetail",
        title: "Events"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });
});

describe("userInteraction - clickTab - non tab element", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/api/sap.m.IconTabBar");
    await util.browser.refresh();
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.SubApiDetail",
        metadata: "sap.ui.documentation.JSDocText",
        text: [
          {
            path: "/description"
          }
        ]
      }
    };
    const index = 0;
    const timeout = 30000;
    await expect(ui5.userInteraction.clickTab(selector, index, timeout)).rejects.toThrow("Retries done. Failed to execute the function");
  });
});
