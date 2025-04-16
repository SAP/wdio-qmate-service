"use strict";

describe("navigationBar - clickBack", async function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products.sepmra/test/index.html?sap-ui-theme=sap_horizon#Shell-home");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await browser.pause(4000);
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellHeadItem",
        "id": "backBtn"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
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
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.clickBack()).rejects.toThrowError("Function 'clickBack' failed with:");
  });
  
});
