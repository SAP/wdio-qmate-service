"use strict";

describe("getAggregationProperty - check name is Accessories", async () => {
  let val;
  it("Preparation", async () => {
    const url = await util.browser.getBaseUrl();
    await common.navigation.navigateToUrl(url);
  });

  it("Execution", async () => {
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "mProperties": {
          "viewId": "container-cart---app",
          "title": [{
            "path": "CategoryName"
          }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    val = await ui5.control.getAggregationProperty(selector, "tooltip");
  });

  it("Verification", () => {
    common.assertion.expectEqual(val, "Open category Accessories");
  });
});