"use strict";

describe("navigation - printCurrentUrl", function () {
  let callsCounter = 0;
  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution and Verification", async function () {
    // rewrite global function for a while
    const variableToKeepConsoleLog = console.log;

    console.log = function customLog(message) {
      console.log = variableToKeepConsoleLog; // restore global object
      ui5.common.assertion.expectEqual(message, "Current URL: " + browser.config.baseUrl);
      callsCounter++;
    };

    await ui5.common.navigation.printCurrentUrl();

    ui5.common.assertion.expectEqual(callsCounter, 1);
  });
});