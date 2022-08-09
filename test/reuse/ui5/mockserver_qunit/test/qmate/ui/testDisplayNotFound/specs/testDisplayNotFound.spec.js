/**
 * Utility class used by application developers to add reuse methods that can be used throughout the tests
 */
const mockHelper = require("../../utils/mockHelper.js");
/**
 * Setup json used to add static data to be reused inside the boundaries of this test case
 */
const setup = require("../data/setup.json");

describe("Test display not found", function () {

  it("Step 01: Navigate to Application", async function () {
    // Use the mockey that depicts the test case name to be able to map it directly to path, and corresponding data
    //http://localhost:34005/webapp/test/flpSandboxMockServer.html?mockKey=myTestCase
    await ui5.navigation.navigateToApplicationWithQueryParamsAndRetry(setup.urlParams.initialIntent, setup.urlParams.queryParams, false);
  });

  it("Step 02: Initialize mock with dynamic function", async function () {
    await mockHelper.initMockServerDynamically(setup);
  });

  it("Step 03: Finalizing app loading", async function () {
    await mockHelper.initApplicationDynamically();
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.Home",
        "metadata": "sap.m.Button",
        "id": "*displayNotFoundBtn"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

  it("Step 04: Expect Button 'Display Not Found'", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.Home",
        "metadata": "sap.m.Button",
        "id": "*displayNotFoundBtn"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

  it("Step 05: Click Button 'Display Not Found'", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.Home",
        "metadata": "sap.m.Button",
        "id": "*displayNotFoundBtn"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Step 06: Check if navigated correctly", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.NotFound",
        "metadata": "sap.m.Title"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

  it("Step 07: Teardown and register coverage", async function () {
    // Register coverage if enabled otherwise will not
    await mockHelper.takeCoverageSnapshot();
  });

});