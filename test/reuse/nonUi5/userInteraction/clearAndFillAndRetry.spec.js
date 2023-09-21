"use strict";

const errorNoValue = "Function 'clearAndFillAndRetry' failed with: value is invalid. It must be of type 'string' or 'number'";

describe("userInteraction - clearAndFillAndRetry - form field", function () {
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

    await nonUi5.userInteraction.clearAndFillAndRetry(element, "");
    await nonUi5.assertion.expectValueToBe(element, "", "value");

    await nonUi5.userInteraction.clearAndFillAndRetry(element, "Second test value");
    await nonUi5.assertion.expectValueToBe(element, "Second test value", "value");
  });
});

describe("userInteraction - clearAndFillAndRetry - no value/with wrong value (error case)", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);
  });

  it("Execution & Verification", async function () {
    // Negative case - empty value
    await expect(nonUi5.userInteraction.clearAndFillAndRetry(element, null, 1)).rejects.toThrow(errorNoValue);

    await expect(nonUi5.userInteraction.clearAndFillAndRetry(element)).rejects.toThrow(errorNoValue);

    await nonUi5.userInteraction.clearAndFillAndRetry(element, 1, 1);

    await expect(nonUi5.userInteraction.clearAndFillAndRetry(element, true, 1)).rejects.toThrow(errorNoValue);
  });
});

describe("userInteraction - clearAndFillAndRetry - button (error case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = await nonUi5.element.getById("Default", 10000);
    await expect(nonUi5.userInteraction.clearAndFillAndRetry(elem, "New test value", 1)).rejects.toThrow(
      "Function 'clearAndFillAndRetry' failed with: Retries done. Failed to execute the function: invalid element state"
    );
  });
});
