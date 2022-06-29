"use strict";

describe("navigationBar - clickUserIcon", async function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/ui/demoapps/demokit/rta/fiori-elements/test/index.html#Shell-home");
  });

  it("Execution", async function () {
    await ui5.navigationBar.clickUserIcon();
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "bindingContextPath": "/actions/4"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

});

describe("navigationBar - clickUserIcon - error case", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://www.sap.com");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.clickUserIcon())
      .rejects.toThrowError(/Function 'clickUserIcon' failed:/);
  });

});