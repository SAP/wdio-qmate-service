"use strict";

describe("getBindingContextPathProperty - check name is Accessories", async () => {
  let aBindings;
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
    const elem = await ui5.element.getDisplayed(selector);
    aBindings = await ui5.control.getPropertyBinding(elem, "title");
  });

  it("Verification", () => {
    common.assertion.expectEqual(aBindings[0].path, "CategoryName");
  });
});