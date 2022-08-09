"use strict";

describe("element - waitToBeVisible", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/waitForElements.html");
  });

  it("Execution & Verification", async function () {
    await nonUi5.element.waitToBeVisible("BUTTON", 30000);
  });
});

describe("element - waitToBeVisible - wrong selector (error case)", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/waitForElements.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.waitToBeVisible("BUTTON[class='wrong']", 1000))
      .rejects.toThrow("Function 'waitToBeVisible' failed");
  });
});

describe("element - waitToBeVisible - invisible selector (error case)", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.waitToBeVisible("P[id='hiddenParagraph']", 1000))
      .rejects.toThrow("Function 'waitToBeVisible' failed");
  });
});