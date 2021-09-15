"use strict";

describe("userInteraction - fillActive form field", function () {
  let element;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);
    // Check field is empty before the test
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution", async function () {
    await non_ui5.common.userInteraction.click(element); // Make the form field active
    await non_ui5.common.userInteraction.fillActive("New test value");
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectValueToBe(element, "New test value", "value");
  });
});

describe("userInteraction - fillActive with empty value", function () {
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
    await non_ui5.common.userInteraction.fillActive();
  });

  it("Verification", async function () {
    // Check the form field itself
    await non_ui5.common.assertion.expectValueToBe(element, "", "value");
  });
});

describe("userInteraction - fillActive a button (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    // Active element is random
    await expect(non_ui5.common.userInteraction.fillActive("New test value"))
      .rejects.toThrow(/invalid element state/);
  });
});