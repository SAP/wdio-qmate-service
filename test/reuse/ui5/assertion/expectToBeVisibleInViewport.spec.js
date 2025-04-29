"user strict";
let selector;
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("assertion - expectToBeVisibleInViewport with element in viewport", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };
  });

  it("Verification", async function () {
    await ui5.assertion.expectToBeVisibleInViewport(selector);
  });
});

describe("assertion - expectToBeVisibleInViewport with element outside viewport (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.Welcome",
        "metadata": "sap.ui.documentation.TitleLink",
        "text": "YouTube"
      }
    };
  });

  it("Verification", async function () {
    await expect(ui5.assertion.expectToBeVisibleInViewport(selector, 0, 2500))
      .rejects.toThrow("Function 'expectToBeVisibleInViewport' failed: Given Selector was not in the Viewport.");
  });
});