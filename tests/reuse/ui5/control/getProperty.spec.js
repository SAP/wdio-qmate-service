"use strict";

describe("getProperty - check name is Accessories reuse", async () => {
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
    const elem = await ui5.element.getDisplayedElement(selector);
    val = await ui5.control.getProperty(elem, "title");
  });

  it("Verification", () => {
    common.assertion.expectEqual(val, "Accessories");
  });
});