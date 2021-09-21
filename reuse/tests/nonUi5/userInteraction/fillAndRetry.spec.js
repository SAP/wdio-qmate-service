"use strict";

describe("userInteraction - fillAndRetry form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getElementById("ExampleValue1", 10000);
    // Check field is empty before the test
    common.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution and Verification", async function () {
    await nonUi5.userInteraction.fillAndRetry(element, "First test value");
    await common.assertion.expectValueToBe(element, "First test value", "value");

    await expect(nonUi5.userInteraction.fillAndRetry(element))
      .rejects.toThrow("Function 'fillAndRetry' failed: Please provide an element and value as arguments.");
    await common.assertion.expectValueToBe(element, "First test value", "value");

    await nonUi5.userInteraction.fillAndRetry(element, "Second test value");
    await common.assertion.expectValueToBe(element, "Second test value", "value");

    await expect(nonUi5.userInteraction.fillAndRetry(element))
      .rejects.toThrow("Function 'fillAndRetry' failed: Please provide an element and value as arguments.");
    await common.assertion.expectValueToBe(element, "Second test value", "value");
  });
});

describe("userInteraction - fillAndRetry a button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await nonUi5.element.getElementById("Default", 10000);
    await expect(nonUi5.userInteraction.fillAndRetry(elem, "New test value", 1))
      .rejects.toThrow("Retries done. Failed to execute the function:");
  });
});