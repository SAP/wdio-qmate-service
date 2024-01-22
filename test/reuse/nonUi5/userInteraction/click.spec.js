"use strict";

describe("userInteraction - click - 'Default' button", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getById("Default", 10000);
    await nonUi5.userInteraction.click(elem);
  });

  it("Verification", async function () {
    const submittedResultField = await nonUi5.element.getById("display1", 10000);
    await nonUi5.assertion.expectValueToBe(submittedResultField, "Default", "textContent");
  });
});

describe("userInteraction - click - disabled button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = await nonUi5.element.getById("Not-clickable", 10000);
    await expect(nonUi5.userInteraction.click(elem)).rejects.toThrow(
      /Function 'click' failed with: Timeout \w*|\d* by waiting for element is clickable/
    ); // \w*|\d* - placeholder for timeout value
  });
});

describe("userInteraction - click - empty value", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.userInteraction.click()).rejects.toThrow("Function 'click' failed with: Please provide an element or a CSS selector as first argument.");
  });
});

describe("userInteraction - click - field (fillActive)", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);
    // Check field is empty before the test
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution", async function () {
    // Make the form field active
    await nonUi5.userInteraction.click(element);
    await common.userInteraction.fillActive("New test value");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectValueToBe(element, "New test value", "value");
  });
});
