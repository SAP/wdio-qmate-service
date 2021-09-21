"use strict";

describe("locator - getElementByName + expectToBeVisible", function () {

  let navigationBar;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution", async function () {
    navigationBar = await non_ui5.common.locator.getElementByName("navbar");
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectToBeVisible(navigationBar, 10000);
  });
});

describe("locator - getElementByName and catch error", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.getElementByName("wrong_name"))
      .rejects.toThrow("Function 'getElementByName' failed");
  });
});