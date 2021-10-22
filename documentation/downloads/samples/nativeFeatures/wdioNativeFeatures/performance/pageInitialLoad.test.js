const assert = require("assert");

// Test is failing: https://github.com/webdriverio/webdriverio/issues/4982

describe.skip("Initialization Page performance test", function () {
  it("step1:Load page and check score", async function () {
    browser.setTimeout({ "pageLoad": 30000000 });
    await browser.enablePerformanceAudits({
      networkThrottling: "online",
      cpuThrottling: 0,
      cacheEnabled: false
    });

    await browser.startTracing();
    await browser.url("#/categories");
    // await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    const metrics = await browser.getMetrics();
    await assert.ok(metrics.speedIndex < 1500);
    const score = await browser.getPerformanceScore(); // get Lighthouse Performance score
    console.log("Performance of page load:" + JSON.stringify(metrics));
    console.log("Lighthouse score:" + score);
    await assert.ok(score >= .01); // Lighthouse Performance score is above 1%

    // window is not defined
    // const resourceList = window.performance.getEntriesByType("resource");
    // resourceList[1].responseEnd - resourceList[1].startTime

    await browser.disablePerformanceAudits();
    await browser.endTracing();
  });
});