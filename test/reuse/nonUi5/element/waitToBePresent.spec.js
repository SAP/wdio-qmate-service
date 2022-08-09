"use strict";

describe("element - waitToBePresent", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/waitForElements.html");
  });

  it("Execution & Verification", async function () {
    await nonUi5.element.waitToBePresent("BUTTON", 30000);
  });
});

describe("element - waitToBePresent - wrong selector (error case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/waitForElements.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.waitToBePresent("BUTTON[class='wrong']", 1000))
      .rejects.toThrow("Function 'waitToBePresent' failed");
  });
});

describe("element - waitToBePresent - invisible element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution & Verification", async function () {
    await nonUi5.element.waitToBePresent("P[id='hiddenParagraph']", 30000);
  });
});