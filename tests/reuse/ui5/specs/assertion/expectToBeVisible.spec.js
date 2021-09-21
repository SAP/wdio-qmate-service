"use strict";
let selector;
<<<<<<< HEAD:tests/reuseApi/tests/reuse/ui5/specs/assertion/expectToBeVisible.spec.js
const {
  handleCookiesConsent
} = require("../../../../utils");

=======
const { handleCookiesConsent } = require("../../../utils");
>>>>>>> ad7e99dc15c8600092d2517a4c25011d893edbde:tests/reuse/ui5/specs/assertion/expectToBeVisible.spec.js
describe("assertion - expectToBeVisible with right selector", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };

  });

  it("Verification", async function () {
    await ui5.common.assertion.expectToBeVisible(selector);
  });
});

describe("assertion - expectToBeVisible with wrong selector", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'Wrong Category')"
      }
    };
  });

  it("Verification", async function () {
    await expect(ui5.common.assertion.expectToBeVisible(selector))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("assertion - expectToBeVisible outside viewport", function () {
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
    await ui5.common.assertion.expectToBeVisible(selector);
  });
});