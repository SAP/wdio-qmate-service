"use strict";

describe("userInteraction - clear form field", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);

    await non_ui5.common.userInteraction.fill(element, "New test value");
    await non_ui5.common.assertion.expectValueToBe(element, "New test value", "value");
  });

  it("Execution", async function () {
    await non_ui5.common.userInteraction.clear(element);
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });
});

describe("userInteraction - clear without element (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.userInteraction.clear())
      .rejects.toThrow("Function 'clear' failed: Please provide an element as first argument.");
  });
});

describe("userInteraction - clear a button (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("Default", 10000);
    await expect(non_ui5.common.userInteraction.clear(elem))
      .rejects.toThrow(/invalid element state/);
  });
});