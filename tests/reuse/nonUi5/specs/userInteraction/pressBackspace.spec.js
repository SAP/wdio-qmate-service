"use strict";

describe("userInteraction - pressBackspace for form field with string", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);

    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
    await non_ui5.common.userInteraction.fill(element, "First test value");
    await non_ui5.common.assertion.expectValueToBe(element, "First test value", "value");
  });

  it("Execution and Verification", async function () {
    await non_ui5.common.userInteraction.pressBackspace();
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectValueToBe(element, "First test valu", "value");
  });
});

describe("userInteraction - pressBackspace for another field (switch between field)", function () {
  let firstField;
  let secondField;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    firstField = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);
    secondField = await non_ui5.common.locator.getElementById("ExampleValue2", 10000);

    await non_ui5.common.assertion.expectValueToBe(firstField, "", "value");
    await non_ui5.common.assertion.expectValueToBe(secondField, "", "value");

    await non_ui5.common.userInteraction.fill(firstField, "New value");
    await non_ui5.common.assertion.expectValueToBe(firstField, "New value", "value");
  });

  it("Execution and Verification", async function () {
    await non_ui5.common.userInteraction.click(secondField); // Make another field active
    await non_ui5.common.userInteraction.pressBackspace();
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectValueToBe(firstField, "New value", "value");
    await non_ui5.common.assertion.expectValueToBe(secondField, "", "value");
  });
});

describe("userInteraction - pressBackspace for a button (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    await non_ui5.common.userInteraction.pressBackspace(); // Nothing happens
  });
});