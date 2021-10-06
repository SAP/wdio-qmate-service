"use strict";

describe("userInteraction - fillAndRetry form field", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);
    // Check field is empty before the test
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution and Verification", async function () {
    await non_ui5.common.userInteraction.fillAndRetry(element, "First test value");
    await non_ui5.common.assertion.expectValueToBe(element, "First test value", "value");

    await expect(non_ui5.common.userInteraction.fillAndRetry(element))
      .rejects.toThrow("Function 'fillAndRetry' failed: Please provide an element and value as arguments.");
    await non_ui5.common.assertion.expectValueToBe(element, "First test value", "value");

    await non_ui5.common.userInteraction.fillAndRetry(element, "Second test value");
    await non_ui5.common.assertion.expectValueToBe(element, "Second test value", "value");

    await expect(non_ui5.common.userInteraction.fillAndRetry(element, undefined, 1, 1000))
      .rejects.toThrow("Function 'fillAndRetry' failed: Please provide an element and value as arguments.");
    await non_ui5.common.assertion.expectValueToBe(element, "Second test value", "value");
  });
});

describe("userInteraction - fillAndRetry a button (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("Default", 10000);
    await expect(non_ui5.common.userInteraction.fillAndRetry(elem, "New test value", 1, 1000))
      .rejects.toThrow("Retries done. Failed to execute the function:");
  });
});