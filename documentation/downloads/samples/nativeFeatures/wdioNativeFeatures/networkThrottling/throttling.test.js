"use strict";
// This spec produces an inner error (but spec passes fine):
// ERROR @wdio/devtools-service:TraceGatherer: Neither network nor CPU idle time could be detected within timeout, wrapping up tracing"
describe("Initialization Page performance test", function () {
  it("Enable throttling", async function () {
    await browser.enablePerformanceAudits({
      networkThrottling: "DSL",
      cpuThrottling: 2,
      cacheEnabled: true
    });
  });

  it("step1:click on the first standard item check id with wildcard", async function () {
    await browser.url("#/categories");
    await browser.disablePerformanceAudits();
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-0",
        "bindingContextPath": "/ProductCategories('AC')"
      }
    };
    var elem = await browser.uiControl(ui5ControlProperties);
    await elem.click();
  });
});