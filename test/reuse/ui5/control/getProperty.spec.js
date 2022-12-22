"use strict";

describe("getProperty - check title is Accessories", async () => {
  let val, valSelector, valSelectorOptions;
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
    val = await ui5.control.getProperty(elem, "title");
    valSelector = await ui5.control.getProperty(selector, "title");
    valSelectorOptions = await ui5.control.getProperty({selector: selector, index: 0, timeout: 3000}, "title");
  });

  it("Verification", () => {
    common.assertion.expectEqual(val, "Accessories");
    common.assertion.expectEqual(valSelector, "Accessories");
    common.assertion.expectEqual(valSelectorOptions, "Accessories");
  });
});