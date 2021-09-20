"use strict";

describe("userInteraction - fillActiveAndRetry form field", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);
    // Check field is empty before the test
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution", async function () {
    // Make the form field active
    await non_ui5.common.userInteraction.click(element);

    await non_ui5.common.userInteraction.fillActiveAndRetry("New test value");
    const submitElement = await non_ui5.common.locator.getElementByCss("[onclick='showValue();']");
    await non_ui5.common.userInteraction.click(submitElement);
  });

  it("Verification", async function () {
    // Check the form field itself
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);
    await non_ui5.common.assertion.expectValueToBe(element, "New test value", "value");

    // Check the submitted value
    const submittedResultField = await non_ui5.common.locator.getElementById("display1", 10000);
    await non_ui5.common.assertion.expectValueToBe(submittedResultField, "New test value", "textContent");
  });
});

describe("userInteraction - fillActiveAndRetry with empty value", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);
    // Check field is empty before the test
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution", async function () {
    // Make the form field active
    await non_ui5.common.userInteraction.click(element);
    await non_ui5.common.userInteraction.fillActiveAndRetry();
  });

  it("Verification", async function () {
    // Check the form field itself
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });
});

describe("userInteraction - fillActiveAndRetry a button (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    // Active element is random
    await expect(non_ui5.common.userInteraction.fillActiveAndRetry("New test value"))
      .rejects.toThrow(/Retries done. Failed to execute the function. increase your retries/);
  });
});