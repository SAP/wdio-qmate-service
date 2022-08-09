/**
 * Utility class used by application developers to add reuse methods that can be used throughout the tests
 */
const mockHelper = require("../../utils/mockHelper.js");
/**
 * Setup json used to add static data to be reused inside the boundaries of this test case
 */
const setup = require("../data/setup.json");

/**
 * The data to be used for this test case
 */
var data = require("../data/testShowEmployeeList.json");

describe("Test show employee list", function () {

  /**
   * Dynamic json data to be used for mocking the backend responses
   */
  const employeesData = require("../data/mock/Employees.json");
  const resumesData = require("../data/mock/Resumes.json");

  it("Step 01: Navigate to Application", async function () {
    // Use the mock key that depicts the test case name to be able to map it directly to path, and corresponding data
    //http://localhost:34005/webapp/test/flpSandboxMockServer.html?mockKey=myTestCase
    await ui5.navigation.navigateToApplicationWithQueryParamsAndRetry(setup.urlParams.initialIntent, setup.urlParams.queryParams, false);
  });

  it("Step 02: Initialize mock and finalize app loading", async function () {
    await mockHelper.initMockServerAndApplication(setup);
  });

  it("Step 03: Mock GET Employees and count requests", async function () {
    await mockHelper.getEmployeesCount("9");
    await mockHelper.getEmployees(employeesData);
    await mockHelper.getResumes(resumesData);
  });

  it("Step 04: Click 'Show Employee List'", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.Home",
        "metadata": "sap.m.Button",
        "id": "*employeeListBtn"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Step 04: Check if the list is loaded", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.employee.EmployeeList",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/Employees*1)"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

  it("Step 05: Click on the employee", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.employee.EmployeeList",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/Employees*1)"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Step 06: Save mock data for resume in db and trigger after event to override results", async function () {
    // Set data in db
    await mockHelper.setResumes(resumesData);
    await mockHelper.setEmployee(employeesData);
    // Make sure that db is not changed from afterfunction event
    const information = await mockHelper.getResumeForEmployee();
    if (information.indexOf("test") !== -1) throw new Error("malfunction afterfunction");
  });

  it("Step 07: Click on 'Flip to Resume' link", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.employee.Employee",
        "metadata": "sap.m.Link"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Step 08: Expect Resume page appears", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.employee.Resume",
        "metadata": "sap.m.Title",
        "id": "*employeeResumePage-title"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

  it("Step 09: Expect Resume Info have text", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.nav.view.employee.Resume",
        "text": "Information of Nancy Davolio tests",
        "metadata": "sap.m.Text"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

  it("Step 10: Teardown and register coverage", async function () {
    // Register coverage if enabled otherwise will not
    await mockHelper.takeCoverageSnapshot();
  });

});