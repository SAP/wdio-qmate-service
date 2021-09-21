"use strict";

describe("userInteraction - clear form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getElementById("ExampleValue1", 10000);

    await nonUi5.userInteraction.fill(element, "New test value");
    await common.assertion.expectValueToBe(element, "New test value", "value");
  });

  it("Execution", async function () {
    await nonUi5.userInteraction.clear(element);
  });

  it("Verification", async function () {
    common.assertion.expectValueToBe(element, "", "value");
  });
});

describe("userInteraction - clear without element (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.userInteraction.clear())
      .rejects.toThrow("Function 'clear' failed: Please provide an element as first argument.");
  });
});

describe("userInteraction - clear a button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await nonUi5.element.getElementById("Default", 10000);
    await expect(nonUi5.userInteraction.clear(elem))
      .rejects.toThrow(/invalid element state/);
  });
});