"use strict";

describe("browser - getBrowserName", function () {

  let browserName;

  it("Execution", async function () {
    await browser.navigateTo(browser.config.baseUrl);
    browserName = await util.browser.getBrowserName();
  });

  it("Verification", async function () {
    const valueAct = browserName;
    const valueExpRegexp = /chrome/;
    await common.assertion.expectTrue(isStringMatchesRegexp(valueAct, valueExpRegexp));
  });

});

function isStringMatchesRegexp(str, regexp) {
  return !!str.match(regexp);
}
