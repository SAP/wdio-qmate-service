"use strict";

describe("getPropertyBinding - check title path is CategoryName", async () => {
  let aBindings, aBindingsSelector, aBindingsSelectorOptions;
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
    aBindingsSelector = await ui5.control.getPropertyBinding(selector, "title");
    aBindingsSelectorOptions = await ui5.control.getPropertyBinding({selector: selector, index: 0, timeout: 30000}, "title");
  });

  it("Verification", () => {
    common.assertion.expectEqual(aBindings[0].path, "CategoryName");
    common.assertion.expectEqual(aBindingsSelector[0].path, "CategoryName");
    common.assertion.expectEqual(aBindingsSelectorOptions[0].path, "CategoryName");
  });
});