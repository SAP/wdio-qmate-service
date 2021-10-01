"use strict";

describe("userInteraction - clearAndRetry form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getElementById("ExampleValue1", 10000);

    await nonUi5.userInteraction.fill(element, "New test value");
    await nonUi5.assertion.expectValueToBe(element, "New test value", "value");
  });

  it("Execution", async function () {
    await nonUi5.userInteraction.clearAndRetry(element, 1);
  });

  it("Verification", async function () {
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });
});

describe("userInteraction - clearAndRetry without element (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.userInteraction.clearAndRetry())
      .rejects.toThrow("Function 'clearAndRetry' failed: Please provide an element as first argument.");
  });
});

describe("userInteraction - clearAndRetry a button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await nonUi5.element.getElementById("Default", 10000);
    await expect(nonUi5.userInteraction.clearAndRetry(elem, 1))
      .rejects.toThrow("Retries done. Failed to execute the function: invalid element state");
  });
});