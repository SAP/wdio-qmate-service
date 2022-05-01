"use strict";

describe("element - waitForAll", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    await nonUi5.element.waitForAll("BUTTON[type='button']", 30000);
  });
});

describe("element - waitForAll - error case", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.waitForAll("BUTTON[class='invalid']", 4000))
      .rejects.toThrow("Function 'waitForAll' failed");
  });
});