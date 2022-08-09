"use strict";

describe("navigationBar - expectPageTitle", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/ui/demoapps/demokit/rta/fiori-elements/test/index.html#Shell-home");
  });

  it("Execution & Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
  });
});

describe("navigationBar - expectPageTitle - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://www.sap.com");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.expectPageTitle("Home"))
      .rejects.toThrowError(/Function 'expectPageTitle' failed:/);
  });
});