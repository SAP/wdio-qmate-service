"use strict";

describe("userInteraction - fill form field", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);
    // Check field is empty before the test
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution and Verification", async function () {
    await non_ui5.common.userInteraction.fill(element, "First test value");
    await non_ui5.common.assertion.expectValueToBe(element, "First test value", "value");

    await non_ui5.common.userInteraction.fill(element, "");
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");

    await non_ui5.common.userInteraction.fill(element, "Second test value");
    await non_ui5.common.assertion.expectValueToBe(element, "Second test value", "value");

    await non_ui5.common.userInteraction.fill(element); // Not an error just console.error() will be called
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });
});

describe.only("userInteraction - fill a button (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("Default", 10000);
    await expect(non_ui5.common.userInteraction.fill(elem, "New test value"))
      .rejects.toThrow(/Function fill failed. Element can not be filled - make sure that the selector matches input/);
  });
});