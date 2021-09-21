"use strict";

describe("userInteraction - fill form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getElementById("ExampleValue1", 10000);
    // Check field is empty before the test
    common.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution and Verification", async function () {
    await nonUi5.userInteraction.fill(element, "First test value");
    await common.assertion.expectValueToBe(element, "First test value", "value");

    await nonUi5.userInteraction.fill(element, "");
    common.assertion.expectValueToBe(element, "", "value");

    await nonUi5.userInteraction.fill(element, "Second test value");
    await common.assertion.expectValueToBe(element, "Second test value", "value");

    await nonUi5.userInteraction.fill(element); // Not an error just console.error() will be called
    common.assertion.expectValueToBe(element, "", "value");
  });
});

describe.only("userInteraction - fill a button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await nonUi5.element.getElementById("Default", 10000);
    await expect(nonUi5.userInteraction.fill(elem, "New test value"))
      .rejects.toThrow(/Function fill failed. Element can not be filled - make sure that the selector matches input/);
  });
});