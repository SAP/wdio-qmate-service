"use strict";

describe("userInteraction - clear - form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);

    await nonUi5.userInteraction.fill(element, "New test value");
    await nonUi5.assertion.expectValueToBe(element, "New test value", "value");
  });

  it("Execution", async function () {
    await nonUi5.userInteraction.clear(element);
  });

  it("Verification", async function () {
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });
});

describe("userInteraction - clear - no element (error case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.userInteraction.clear())
      .rejects.toThrow("Function 'clear' failed with: Please provide an element or a CSS selector as first argument.");
  });
});

describe("userInteraction - clear - button (error case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = await nonUi5.element.getById("Default", 10000);
    await expect(nonUi5.userInteraction.clear(elem))
      .rejects.toThrow(/invalid element state/);
  });
});