"use strict";

describe("userInteraction - attribute and value", function () {

  describe("textarea field and \"value\" attribute", function () {
    let element;

    it("Preparation", async function () {
      await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
      element = await nonUi5.element.getById("ExampleTextArea", 10000);
    });

    it("Verify field is empty", async function () {
      // Check field is empty before the test
      nonUi5.assertion.expectValueToBe(element, "");
    });

    it("Verify field is empty using attribute \"value\"", async function () {
      // Check field is empty before the test
      nonUi5.assertion.expectValueToBe(element, "", "value");
    });

    it("Clear and fill textarea field", async function () {
      await nonUi5.userInteraction.clearAndFill(element, "textarea first test value");
    });

    it("Verify value", async function () {
      await nonUi5.assertion.expectValueToBe(element, "textarea first test value");
    });

    it("Verify value using attribute \"value\"", async function () {
      await nonUi5.assertion.expectValueToBe(element, "textarea first test value", "value");
    });

    it("Clear and enter new text", async function () {
      await nonUi5.userInteraction.clearAndFill(element, "textarea second test value");
    });

    it("Verify new value", async function () {
      await nonUi5.assertion.expectValueToBe(element, "textarea second test value");
    });

    it("Verify new value using attribute \"value\"", async function () {
      await nonUi5.assertion.expectValueToBe(element, "textarea second test value", "value");
    });

  });

  describe("input field and \"value\" attribute", function () {
    let element;

    it("Preparation", async function () {
      await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
      element = await nonUi5.element.getById("ExampleValue1", 10000);
    });

    it("Verify field is empty", async function () {
      // Check field is empty before the test
      nonUi5.assertion.expectValueToBe(element, "");
    });

    it("Verify field is empty using attribute \"value\"", async function () {
      // Check field is empty before the test
      nonUi5.assertion.expectValueToBe(element, "", "value");
    });

    it("Clear and fill input field", async function () {
      await nonUi5.userInteraction.clearAndFill(element, "First test value");
    });

    it("Verify value", async function () {
      await nonUi5.assertion.expectValueToBe(element, "First test value");
    });

    it("Verify value using attribute \"value\"", async function () {
      await nonUi5.assertion.expectValueToBe(element, "First test value", "value");
    });

    it("Clear and enter new text", async function () {
      await nonUi5.userInteraction.clearAndFill(element, "Second test value");
    });

    it("Verify new value", async function () {
      await nonUi5.assertion.expectValueToBe(element, "Second test value");
    });

    it("Verify new value using attribute \"value\"", async function () {
      await nonUi5.assertion.expectValueToBe(element, "Second test value", "value");
    });

  });

  describe("button and \"textContent\" attribute", function () {
    it("Preparation", async function () {
      await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
    });

    it("Execution", async function () {
      const elem = await nonUi5.element.getById("Default", 10000);
      await nonUi5.userInteraction.clickAndRetry(elem);
    });

    it("Verify button text", async function () {
      const defaultButton = await nonUi5.element.getById("Default", 10000);
      await nonUi5.assertion.expectValueToBe(defaultButton, "Default");
    });

    it("Verify button text using \"textContent\" attribute", async function () {
      const defaultButton = await nonUi5.element.getById("Default", 10000);
      await nonUi5.assertion.expectValueToBe(defaultButton, "Default", "textContent");
    });
  });

  describe("span and \"textContent\" attribute", function () {
    it("Preparation", async function () {
      await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
    });

    it("Execution", async function () {
      const elem = await nonUi5.element.getById("Default", 10000);
      await nonUi5.userInteraction.clickAndRetry(elem);
    });

    it("Verify span text", async function () {
      const submittedResultField = await nonUi5.element.getById("display1", 10000);
      await nonUi5.assertion.expectValueToBe(submittedResultField, "Default");
    });

    it("Verify span text using \"textContent\" attribute", async function () {
      const submittedResultField = await nonUi5.element.getById("display1", 10000);
      await nonUi5.assertion.expectValueToBe(submittedResultField, "Default", "textContent");
    });
  });

});