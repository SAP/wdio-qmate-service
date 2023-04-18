"use strict";

describe("userInteraction - fill - form field", function () {
  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);
    // Check field is empty before the test
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution & Verification", async function () {
    await nonUi5.userInteraction.fill(element, "First test value");
    await nonUi5.assertion.expectValueToBe(element, "First test value", "value");

    await nonUi5.userInteraction.fill(element, "");
    nonUi5.assertion.expectValueToBe(element, "", "value");

    await nonUi5.userInteraction.fill(element, "Second test value");
    await nonUi5.assertion.expectValueToBe(element, "Second test value", "value");

    await nonUi5.userInteraction.fill(element); // Not an error just console.error() will be called
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });
});

describe.only("userInteraction - fill - button (error case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = await nonUi5.element.getById("Default", 10000);
    await expect(nonUi5.userInteraction.fill(elem, "New test value")).rejects.toThrow(/Function 'fill' failed with: invalid element state/);
  });
});
