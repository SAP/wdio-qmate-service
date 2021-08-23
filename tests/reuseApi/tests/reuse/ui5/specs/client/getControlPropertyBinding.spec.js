"use strict";

describe("getControlPropertyBinding - check name is Accessories", async () => {
  let aBindings;
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
    aBindings = await ui5.common.client.getControlPropertyBinding(elem, "title");
  });

  it("Verification", () => {
    ui5.common.assertion.expectEqual(aBindings[0].path, "CategoryName");
  });
});