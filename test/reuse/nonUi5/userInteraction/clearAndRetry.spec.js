"use strict";

describe("userInteraction - clearAndRetry - form field", function () {
  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);

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

describe("userInteraction - clearAndRetry - no element (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.userInteraction.clearAndRetry()).rejects.toThrow(
      "Function 'clearAndRetry' failed with: Please provide an element or a CSS selector as first argument."
    );
  });
});

describe("userInteraction - clearAndRetry - button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = await nonUi5.element.getById("Default", 10000);
    await expect(nonUi5.userInteraction.clearAndRetry(elem, 1)).rejects.toThrow("Function 'clearAndRetry' failed with: Retries done. Failed to execute the function:");
  });
});
