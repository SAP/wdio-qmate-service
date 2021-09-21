"use strict";

describe("userInteraction - clearAndRetry form field", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);

    await non_ui5.common.userInteraction.fill(element, "New test value");
    await non_ui5.common.assertion.expectValueToBe(element, "New test value", "value");
  });

  it("Execution", async function () {
    await non_ui5.common.userInteraction.clearAndRetry(element, 1);
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });
});

describe("userInteraction - clearAndRetry without element (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.userInteraction.clearAndRetry())
      .rejects.toThrow("Function 'clearAndRetry' failed: Please provide an element as first argument.");
  });
});

describe("userInteraction - clearAndRetry a button (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("Default", 10000);
    await expect(non_ui5.common.userInteraction.clearAndRetry(elem, 1))
      .rejects.toThrow("Retries done. Failed to execute the function: invalid element state");
  });
});