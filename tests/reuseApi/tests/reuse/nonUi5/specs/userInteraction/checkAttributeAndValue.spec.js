"use strict";

describe("userInteraction - attribute and value", function () {

  describe("textarea field and \"value\" attribute", function () {
    let element;

    it("Preparation", async function () {
      await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
      element = await non_ui5.common.locator.getElementById("ExampleTextArea", 10000);
    });

    it("Verify field is empty", async function () {
      // Check field is empty before the test
      await non_ui5.common.assertion.expectValueToBe(element, "");
    });

    it("Verify field is empty using attribute \"value\"", async function () {
      // Check field is empty before the test
      await non_ui5.common.assertion.expectValueToBe(element, "", "value");
    });

    it("Clear and fill textarea field", async function () {
      await non_ui5.common.userInteraction.clearAndFill(element, "textarea first test value");
    });

    it("Verify value", async function () {
      await non_ui5.common.assertion.expectValueToBe(element, "textarea first test value");
    });

    it("Verify value using attribute \"value\"", async function () {
      await non_ui5.common.assertion.expectValueToBe(element, "textarea first test value", "value");
    });

    it("Clear and enter new text", async function () {
      await non_ui5.common.userInteraction.clearAndFill(element, "textarea second test value");
    });

    it("Verify new value", async function () {
      await non_ui5.common.assertion.expectValueToBe(element, "textarea second test value");
    });

    it("Verify new value using attribute \"value\"", async function () {
      await non_ui5.common.assertion.expectValueToBe(element, "textarea second test value", "value");
    });

  });

  describe("input field and \"value\" attribute", function () {
    let element;

    it("Preparation", async function () {
      await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/forms.html");
      element = await non_ui5.common.locator.getElementById("ExampleValue1", 10000);
    });

    it("Verify field is empty", async function () {
      // Check field is empty before the test
      await non_ui5.common.assertion.expectValueToBe(element, "");
    });

    it("Verify field is empty using attribute \"value\"", async function () {
      // Check field is empty before the test
      await non_ui5.common.assertion.expectValueToBe(element, "", "value");
    });

    it("Clear and fill input field", async function () {
      await non_ui5.common.userInteraction.clearAndFill(element, "First test value");
    });

    it("Verify value", async function () {
      await non_ui5.common.assertion.expectValueToBe(element, "First test value");
    });

    it("Verify value using attribute \"value\"", async function () {
      await non_ui5.common.assertion.expectValueToBe(element, "First test value", "value");
    });

    it("Clear and enter new text", async function () {
      await non_ui5.common.userInteraction.clearAndFill(element, "Second test value");
    });

    it("Verify new value", async function () {
      await non_ui5.common.assertion.expectValueToBe(element, "Second test value");
    });

    it("Verify new value using attribute \"value\"", async function () {
      await non_ui5.common.assertion.expectValueToBe(element, "Second test value", "value");
    });

  });

  describe("button and \"textContent\" attribute", function () {
    it("Preparation", async function () {
      await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
    });

    it("Execution", async function () {
      const elem = await non_ui5.common.locator.getElementById("Default", 10000);
      await non_ui5.common.userInteraction.clickAndRetry(elem);
    });

    it("Verify button text", async function () {
      const defaultButton = await non_ui5.common.locator.getElementById("Default", 10000);
      await non_ui5.common.assertion.expectValueToBe(defaultButton, "Default");
    });

    it("Verify button text using \"textContent\" attribute", async function () {
      const defaultButton = await non_ui5.common.locator.getElementById("Default", 10000);
      await non_ui5.common.assertion.expectValueToBe(defaultButton, "Default", "textContent");
    });
  });

  describe("span and \"textContent\" attribute", function () {
    it("Preparation", async function () {
      await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
    });

    it("Execution", async function () {
      const elem = await non_ui5.common.locator.getElementById("Default", 10000);
      await non_ui5.common.userInteraction.clickAndRetry(elem);
    });

    it("Verify span text", async function () {
      const submittedResultField = await non_ui5.common.locator.getElementById("display1", 10000);
      await non_ui5.common.assertion.expectValueToBe(submittedResultField, "Default");
    });

    it("Verify span text using \"textContent\" attribute", async function () {
      const submittedResultField = await non_ui5.common.locator.getElementById("display1", 10000);
      await non_ui5.common.assertion.expectValueToBe(submittedResultField, "Default", "textContent");
    });
  });

});

