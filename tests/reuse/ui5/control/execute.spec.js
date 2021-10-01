"use strict";

describe("execute - check name is Accessories", async () => {
  let title;
  const newTitle = "whatsUp2";
  it("Preparation", async () => {
    const url = await util.browser.getBaseUrl();
    await common.navigation.navigateToUrl(url);
  });

  it("Execution", async () => {
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-7",
        "bindingContextPath": "/ProductCategories('LT')"
      }
    };
    const elem = await ui5.element.getDisplayedElement(selector);
    title = await ui5.control.execute(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, elem, newTitle);
  });

  it("Verification", () => {
    common.assertion.expectEqual(title, newTitle);
  });
});