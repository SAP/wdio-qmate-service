"use strict";

describe("locator - getElementByName + expectToBeVisible", function () {

  let navigationBar;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution", async function () {
    navigationBar = await nonUi5.element.getElementByName("navbar");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(navigationBar, 10000);
  });
});

describe("locator - getElementByName and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getElementByName("wrong_name"))
      .rejects.toThrow("Function 'getElementByName' failed");
  });
});