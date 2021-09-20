"use strict";

describe("navigation - printCurrentUrl", function () {
  let callsCounter = 0;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution and Verification", async function () {
    // rewrite global function for a while
    const variableToKeepConsoleLog = util.console.info;

    util.console.info = function customLog(message) {
      util.console.info = variableToKeepConsoleLog; // restore global object
      ui5.common.assertion.expectEqual(message, "Current URL: " + browser.config.baseUrl);
      callsCounter++;
    };

    await common.navigation.printCurrentUrl();

    common.assertion.expectEqual(callsCounter, 1);
  });
});