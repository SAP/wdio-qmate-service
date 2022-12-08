const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("userInteraction - clickListItem - ObjectListItem", function () {

  let selector;
  let expectedToastText;
  let index;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.ObjectListItem/sample/sap.m.sample.ObjectListItem");
    await handleCookiesConsent();
  });

  it("Execution - click list item", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.ObjectListItem.List",
        "metadata": "sap.m.ObjectListItem",
        "bindingContextPath": "/ProductCollection/1"
      }
    };
    index = 0;
    await ui5.userInteraction.clickListItem(selector, index);
  });

  it("Verification", async function () {
    expectedToastText = "Pressed : Notebook Basic 17";
    await ui5.assertion.expectMessageToastTextToBe(expectedToastText);
  });
});

describe("userInteraction - clickListItem - NotificationListItem", function () {

  let selector;
  let expectedToastText;
  let index;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.NotificationListItem/sample/sap.m.sample.NotificationListItem");
    await handleCookiesConsent();
  });

  it("Execution - click list item", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.NotificationListItem.V",
        "metadata": "sap.m.NotificationListItem",
        "title": "New order (#2524), without action buttons"
      }
    };
    index = 0;
    await ui5.userInteraction.clickListItem(selector, index);
  });

  it("Verification", async function () {
    expectedToastText = "Item Pressed: New order (#2524), without action buttons";
    await ui5.assertion.expectMessageToastTextToBe(expectedToastText);
  });
});

// Does not work, click works but not clickListItem
describe("userInteraction - clickListItem - StandardListItem", function () {

  let selector;
  let index;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.List/sample/sap.m.sample.ListSelection");
    await handleCookiesConsent();
  });

  it("Execution - click list item", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.ListSelection.List",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCollection/1"
      }
    };
    index = 0;

    await ui5.userInteraction.clickListItem(selector, index);
  });

  it("Verification", async function () {
    const checkBox = {
      "elementProperties": {
        "viewName": "sap.m.sample.ListSelection.List",
        "metadata": "sap.m.CheckBox",
        "bindingContextPath": "/ProductCollection/1"
      }
    };
    const attribute = "selected";
    const isChecked = await ui5.element.getPropertyValue(checkBox, attribute);
    await common.assertion.expectTrue(isChecked);
  });
});