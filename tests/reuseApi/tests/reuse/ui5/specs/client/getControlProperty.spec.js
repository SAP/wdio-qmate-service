"use strict";

describe("getControlProperty - check name is Accessories reuse", async () => {
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
    const elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    val = await ui5.common.client.getControlProperty(elem, "title");
  });

  it("Verification", () => {
    ui5.common.assertion.expectEqual(val, "Accessories");
  });
});