"use strict";

describe("userInteraction - clickAndRetry - 'Default' button", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getById("Default", 10000);
    await nonUi5.userInteraction.clickAndRetry(elem);
  });

  it("Verification", async function () {
    const submittedResultField = await nonUi5.element.getById("display1", 10000);
    await nonUi5.assertion.expectValueToBe(submittedResultField, "Default", "textContent");
  });
});

describe("userInteraction - clickAndRetry - disabled button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = await nonUi5.element.getById("Not-clickable", 10000);
    await expect(nonUi5.userInteraction.clickAndRetry(elem, 1)).rejects.toThrow(
      "Function 'clickAndRetry' failed with: Retries done. Failed to execute the function: Timeout '0.001s' by waiting for element is enabled."
    );
  });
});

describe("userInteraction - clickAndRetry - empty value", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.userInteraction.clickAndRetry()).rejects.toThrow(
      "Function 'clickAndRetry' failed with: Please provide an element or a CSS selector as first argument."
    );
  });
});

describe("userInteraction - clickAndRetry - field (make it active)", function () {
  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);
    // Check field is empty before the test
    nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution", async function () {
    // Make the form field active
    await nonUi5.userInteraction.clickAndRetry(element);
    await common.userInteraction.fillActive("New test value");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectValueToBe(element, "New test value", "value");
  });
});
