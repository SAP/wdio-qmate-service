"use strict";

describe("navigationBar - clickBack", async function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/ui/demoapps/demokit/rta/fiori-elements/test/index.html#Shell-home");
    const selector = {
      "elementProperties": {
        "viewName": "module:sap/ushell/components/homepage/DashboardContent.view",
        "metadata": "sap.m.GenericTile",
        "bindingContextPath": "/groups/0/tiles/0/content/0"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution", async function () {
    await ui5.navigationBar.clickBack();
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
  });

});

describe("navigationBar - clickBack - error case", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/ui/demoapps/demokit/rta/fiori-elements/test/index.html#Shell-home");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.clickBack())
      .rejects.toThrowError(/Function 'clickBack' failed:/);
  });

});