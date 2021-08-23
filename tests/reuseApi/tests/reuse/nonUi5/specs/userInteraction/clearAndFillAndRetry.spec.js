"use strict";

describe("userInteraction - clearAndFillAndRetry form field", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);

    // Check field is empty before the test
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution and Verification", async function () {
    await non_ui5.common.userInteraction.clearAndFillAndRetry(element, "First test value");
    await non_ui5.common.assertion.expectValueToBe(element, "First test value", "value");

    await non_ui5.common.userInteraction.clearAndFillAndRetry(element, "");
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");

    await non_ui5.common.userInteraction.clearAndFillAndRetry(element, "Second test value");
    await non_ui5.common.assertion.expectValueToBe(element, "Second test value", "value");
  });
});

describe("userInteraction - clearAndFillAndRetry without value/with wrong value (unhappy case)", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);
  });

  it("Execution and Verification", async function () {
    // Negative case - empty value
    await expect(non_ui5.common.userInteraction.clearAndFillAndRetry(element, null, 1))
      .rejects.toThrow(/Values not entered correctly/); // undefined !== "" in the inner verification

    await expect(non_ui5.common.userInteraction.clearAndFillAndRetry(element))
      .rejects.toThrow(/Values not entered correctly/); // undefined !== "" in the inner verification

    await expect(non_ui5.common.userInteraction.clearAndFillAndRetry(element, 1, 1))
      .rejects.toThrow(/Values not entered correctly/); // Added 1, but then received "1" in the inner verification

    await expect(non_ui5.common.userInteraction.clearAndFillAndRetry(element, true, 1))
      .rejects.toThrow(/Values not entered correctly/); // Added true, but then received "true" in the inner verification
  });
});

describe("userInteraction - clearAndFillAndRetry a button (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("Default", 10000);
    await expect(non_ui5.common.userInteraction.clearAndFillAndRetry(elem, "New test value", 1))
      .rejects.toThrow(/Retries done. Failed to execute the function. increase your retries/);
  });
});