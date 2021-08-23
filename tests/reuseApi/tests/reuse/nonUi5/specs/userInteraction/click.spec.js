"use strict";

describe("userInteraction - click on 'Default' button", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    const elem = await non_ui5.common.locator.getElementById("Default", 10000);
    await non_ui5.common.userInteraction.click(elem);
  });

  it("Verification", async function () {
    const submittedResultField = await non_ui5.common.locator.getElementById("display1", 10000);
    await non_ui5.common.assertion.expectValueToBe(submittedResultField, "Default", "textContent");
  });
});

describe("userInteraction - click on disabled button (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await non_ui5.common.locator.getElementById("Not-clickable", 10000);
    await expect(non_ui5.common.userInteraction.click(elem))
      .rejects.toThrow(/Timeout \w*|\d* by waiting for element is clickable/); // \w*|\d* - placeholder for timeout value
  });
});

describe("userInteraction - click for empty value", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.userInteraction.click())
      .rejects.toThrow(/not\w*|\d*clickable/);
  });
});

describe("userInteraction - click on field (make it active)", function () {
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
    await non_ui5.common.userInteraction.fillActive("New test value");
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectValueToBe(element, "New test value", "value");
  });
});