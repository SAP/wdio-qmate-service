"use strict";

describe("navigationBar - clickSapLogo", async function () {
  const baseUrl = "https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products.sepmra/test/index.html?sap-ui-theme=sap_horizon#masterDetail-display";
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(baseUrl);
    await ui5.navigationBar.expectPageTitle("Manage Products");
  });

  it("Execution", async function () {
    await ui5.navigationBar.clickSapLogo();
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
  });
});

describe("navigationBar - clickSapLogo - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://www.sap.com");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.clickSapLogo(10000)).rejects.toThrowError("Function 'clickSapLogo' failed with:");
  });
});
