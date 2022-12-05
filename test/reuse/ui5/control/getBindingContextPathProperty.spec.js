"use strict";

describe("getBindingContextPathProperty - check binding context path is /ProductCategories('AC')", async () => {
  let bindingContextPath, bindingContextPathSelector, bindingContextPathSelectorOptions;
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
    bindingContextPath = await ui5.control.getBindingContextPathProperty(elem);
    bindingContextPathSelector = await ui5.control.getBindingContextPathProperty(selector);
    bindingContextPathSelectorOptions = await ui5.control.getBindingContextPathProperty({selector: selector, index: 0, timeout: 30000});
  });

  it("Verification", () => {
    common.assertion.expectEqual(bindingContextPath, "/ProductCategories('AC')");
    common.assertion.expectEqual(bindingContextPathSelector, "/ProductCategories('AC')");
    common.assertion.expectEqual(bindingContextPathSelectorOptions, "/ProductCategories('AC')");
  });
});