"use strict";

describe("getControlAggregationProperty - check name is Accessories", async () => {
  let val;
  it("Preparation", async () => {
    const url = await utilities.browser.getBaseUrl();
    await non_ui5.common.navigation.navigateToUrl(url);
  });

  it("Execution", async () => {
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem", "mProperties": {
          "viewId": "container-cart---app",
          "title": [{ "path": "CategoryName" }],
          "bindingContextPath": "/ProductCategories*"
        }
      }
    };
    val = await ui5.common.client.getControlAggregationProperty(ui5ControlProperties, "tooltip");
  });

  it("Verification", () => {
    ui5.common.assertion.expectEqual(val, "Open category Accessories");
  });
});