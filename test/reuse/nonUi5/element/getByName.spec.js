"use strict";

describe("element - getByName + expectToBeVisible", function () {

  let navigationBar;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution", async function () {
    navigationBar = await nonUi5.element.getByName("navbar");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(navigationBar, 10000);
  });
});

describe("element - getByName and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.getByName("wrong_name"))
      .rejects.toThrow("Function 'getByName' failed");
  });
});