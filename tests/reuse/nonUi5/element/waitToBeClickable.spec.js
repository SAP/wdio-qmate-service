"use strict";

describe("element - waitToBeClickable", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/waitForElements.html");
  });

  it("Execution", async function () {
    await nonUi5.element.waitToBeClickable("BUTTON", 40000);
  });
});

describe("element - waitToBeClickable - error case", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.waitToBeClickable("BUTTON[id='Not-clickable']", 4000))
      .rejects.toThrow("Function 'waitToBeClickable' failed");
  });
});