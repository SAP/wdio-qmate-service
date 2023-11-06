"use strict";

const errorNoElement = "Function 'clearAndFill' failed with: Please provide an element or a CSS selector as first argument.";
const errorNoValue = "Function 'clearAndFill' failed with: value is invalid. It must be of type 'string' or 'number'";

describe("userInteraction - clearAndFill - form field", function () {
  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);

    // Check field is empty before the test
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution & Verification", async function () {
    await nonUi5.userInteraction.clearAndFill(element, "First test value");
    await nonUi5.assertion.expectValueToBe(element, "First test value", "value");

    await nonUi5.userInteraction.clearAndFill(element, "Second test value");
    await nonUi5.assertion.expectValueToBe(element, "Second test value", "value");
  });
});

describe("userInteraction - clearAndFill - form field (error cases)", function () {
  let element;
  
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);

    // Check field is empty before the test
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.userInteraction.clearAndFill(element)).rejects.toThrow(errorNoValue);
    await expect(nonUi5.userInteraction.clearAndFill()).rejects.toThrow(errorNoElement);
    await expect(nonUi5.userInteraction.clearAndFill(element, null)).rejects.toThrow(errorNoValue);

    nonUi5.assertion.expectValueToBe(element, "", "value");
  });
});

describe("userInteraction - clearAndFill - a button (error case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = await nonUi5.element.getById("Default", 10000);
    await expect(nonUi5.userInteraction.clearAndFill(elem, "New test value")).rejects.toThrow(/Function 'clearAndFill' failed with: invalid element state/);
  });
});
