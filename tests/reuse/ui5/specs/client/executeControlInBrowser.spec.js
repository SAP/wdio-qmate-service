"use strict";

describe("executeControlInBrowser - check name is Accessories", async () => {
  let title;
  const newTitle = "whatsUp2";
  it("Preparation", async () => {
    const url = await utilities.browser.getBaseUrl();
    await non_ui5.common.navigation.navigateToUrl(url);
  });

  it("Execution", async () => {
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-7",
        "bindingContextPath": "/ProductCategories('LT')"
      }
    };
    const elem = await ui5.common.locator.getDisplayedElement(ui5ControlProperties);
    title = await ui5.common.client.executeControlInBrowser(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, elem, newTitle);
  });

  it("Verification", () => {
    ui5.common.assertion.expectEqual(title, newTitle);
  });
});