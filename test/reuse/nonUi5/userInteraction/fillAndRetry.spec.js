"use strict";

const errorMessage = "Function 'fillAndRetry' failed with: value is invalid. It must be of type 'string' or 'number'";

describe("userInteraction - fillAndRetry - form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);
    // Check field is empty before the test
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution & Verification", async function () {
    await nonUi5.userInteraction.fillAndRetry(element, "First test value");
    await nonUi5.assertion.expectValueToBe(element, "First test value", "value");

    await expect(nonUi5.userInteraction.fillAndRetry(element)).rejects.toThrow(errorMessage);
    await nonUi5.assertion.expectValueToBe(element, "First test value", "value");

    await nonUi5.userInteraction.fillAndRetry(element, "Second test value");
    await nonUi5.assertion.expectValueToBe(element, "Second test value", "value");

    await expect(nonUi5.userInteraction.fillAndRetry(element)).rejects.toThrow(errorMessage);
    await nonUi5.assertion.expectValueToBe(element, "Second test value", "value");
  });
});

describe("userInteraction - fillAndRetry - button (error case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = await nonUi5.element.getById("Default", 10000);
    await expect(nonUi5.userInteraction.fillAndRetry(elem, "New test value", 1)).rejects.toThrow(
      "Function 'retry' failed with: Retries done. Failed to execute the function"
    );
  });
});
