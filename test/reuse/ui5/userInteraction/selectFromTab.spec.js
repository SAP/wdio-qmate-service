const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - selectFromTab", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/api/sap.m.IconTabBar");
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
    const value = "expand";
    const index = 0;
    const timeout = 30000;
    await ui5.userInteraction.selectFromTab(selector, value, index, timeout);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.SubApiDetail",
        metadata: "sap.ui.documentation.JSDocText",
        text: "*<p>Indicates that the tab will expand or collapse.<br><br><i>Since: 1.15.0.</i></p>*"
      },
      ancestorProperties: {
        metadata: "sap.ui.documentation.ObjectPageSubSection",
        viewName: "sap.ui.documentation.sdk.view.SubApiDetail",
        title: "expand"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });
});
