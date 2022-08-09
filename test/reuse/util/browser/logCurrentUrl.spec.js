"use strict";

describe("browser - printCurrentUrl", function () {
  let callsCounter = 0;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    // rewrite global function for a while
    const variableToKeepConsoleLog = util.console.info;

    util.console.info = function customLog(message) {
      util.console.info = variableToKeepConsoleLog; // restore global object
      common.assertion.expectEqual(message, "Current URL: " + browser.config.baseUrl);
      callsCounter++;
    };

    await util.browser.logCurrentUrl();

    common.assertion.expectEqual(callsCounter, 1);
  });
});