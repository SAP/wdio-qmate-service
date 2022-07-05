"use strict";

describe("userInteraction - clearAndFillAndRetry form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);

    // Check field is empty before the test
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution & Verification", async function () {
    await nonUi5.userInteraction.clearAndFillAndRetry(element, "First test value");
    await nonUi5.assertion.expectValueToBe(element, "First test value", "value");

    await expect(nonUi5.userInteraction.clearAndFillAndRetry(element, ""))
      .rejects.toThrow("Retries done. Failed to execute the function: Error: Function 'clearAndFill' failed: Please provide an element and value as arguments.");
    await nonUi5.assertion.expectValueToBe(element, "First test value", "value");

    await nonUi5.userInteraction.clearAndFillAndRetry(element, "Second test value");
    await nonUi5.assertion.expectValueToBe(element, "Second test value", "value");
  });
});

describe("userInteraction - clearAndFillAndRetry without value/with wrong value (unhappy case)", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);
  });

  it("Execution & Verification", async function () {
    // Negative case - empty value
    await expect(nonUi5.userInteraction.clearAndFillAndRetry(element, null, 1))
      .rejects.toThrow("Retries done. Failed to execute the function: Error: Function 'clearAndFill' failed: Please provide an element and value as arguments."); // undefined !== "" in the inner verification

    await expect(nonUi5.userInteraction.clearAndFillAndRetry(element))
      .rejects.toThrow("Retries done. Failed to execute the function: Error: Function 'clearAndFill' failed: Please provide an element and value as arguments."); // undefined !== "" in the inner verification

    await nonUi5.userInteraction.clearAndFillAndRetry(element, 1, 1); // Added 1, but then received "1" in the inner verification

    await expect(nonUi5.userInteraction.clearAndFillAndRetry(element, true, 1))
      .rejects.toThrow("Retries done. Failed to execute the function: Error: Function 'clearAndFillAndRetry' failed. Verification of value failed."); // Added true, but then received "true" in the inner verification
  });
});

describe("userInteraction - clearAndFillAndRetry a button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = await nonUi5.element.getById("Default", 10000);
    await expect(nonUi5.userInteraction.clearAndFillAndRetry(elem, "New test value", 1))
      .rejects.toThrow("Retries done. Failed to execute the function: Error: Function 'clearAndFill' failed: invalid element state: invalid element state");
  });
});