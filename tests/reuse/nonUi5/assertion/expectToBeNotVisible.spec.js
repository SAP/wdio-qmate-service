"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("assertion - expectToBeVisible", function () {
  let hiddenElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution", async function () {
    hiddenElement = await $("[id='hiddenParagraph']");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeNotVisible(hiddenElement, 10000);
  });
});

describe("assertion - expectToBeNotVisible for visible element and catch error", function () {

  let visibleElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution", async function () {
    visibleElement = await nonUi5.element.getById("visibleParagraph");
  });

  it("Verification", async function () {
    await expect(nonUi5.assertion.expectToBeNotVisible(visibleElement))
      .rejects.toThrow("Element is visible, timeout reached.");

    await expect(nonUi5.assertion.expectToBeNotVisible(undefined))
      .rejects.toThrow("Function 'expectToBeNotVisible' failed. Please provide an element as argument.");
  });
});

