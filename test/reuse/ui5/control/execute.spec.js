"use strict";

describe("execute - check updated title is 'whatsUp2' - pass element", async () => {
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
    const elem = await ui5.element.getDisplayed(selector);
    title = await ui5.control.execute(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, elem, newTitle);
  });

  it("Verification", () => {
    common.assertion.expectEqual(title, newTitle);
  });
});
describe("execute - check updated title is 'whatsUp2' - pass selector", async () => {
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
    title = await ui5.control.execute(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, selector, newTitle);
  });

  it("Verification", () => {
    common.assertion.expectEqual(title, newTitle);
  });
});
describe("execute - check updated title is 'whatsUp2' - pass selector with options", async () => {
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
    title = await ui5.control.execute(function (control, txt, done) {
      control.setTitle(txt);
      done(control.getTitle());
    }, { selector: selector, index: 0, timeout: 30000}, newTitle);
  });

  it("Verification", () => {
    common.assertion.expectEqual(title, newTitle);
  });
});