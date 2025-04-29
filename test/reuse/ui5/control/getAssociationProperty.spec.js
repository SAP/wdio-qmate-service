"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("getAssociationProperty - 'ariaDescribedBy' of Button", function () {
  let val;
  it("Preparation", async () => {
    const url = "https://sapui5.hana.ondemand.com/#/entity/sap.m.Button/sample/sap.m.sample.Button";
    await common.navigation.navigateToUrl(url);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async () => {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "text": "Default"
      },
      "ancestorProperties": {
        "metadata": "sap.m.FlexItemData",
        "viewName": "sap.m.sample.Button.Page"
      }
    };
    val = await ui5.control.getAssociationProperty(selector, "ariaDescribedBy");
  });

  it("Verification", async () => {
    common.assertion.expectEqual(val, ["__xmlview0--defaultButtonDescription", "__xmlview0--genericButtonDescription"]);
  });

});
describe("getAssociationProperty - 'selectedItems' of MultiComboBox", function () {
  let selector, selectedItems;
  it("Preparation", async () => {
    const url = "https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox";
    await common.navigation.navigateToUrl(url);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
    selector = {
      "elementProperties": { "metadata": "sap.m.MultiComboBox" },
      "parentProperties": { "metadata": "sap.ui.layout.VerticalLayout" }
    };
    var id = await ui5.element.getId(selector);
    const element = await $("[id='" + id + "-arrow']");
    await element.click();
    const item1 = {
      "elementProperties": { "metadata": "sap.m.CheckBox" },
      "parentProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": "Astro Phone 6" } }
    };
    await ui5.userInteraction.click(item1);
    const item2 = {
      "elementProperties": { "metadata": "sap.m.CheckBox" },
      "parentProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": "Beam Breaker B-2" } }
    };
    await ui5.userInteraction.click(item2);
  });

  it("Execution", async () => {
    selectedItems = await ui5.control.getAssociationProperty(selector, "selectedItems");
  });

  it("Verification", async () => {
    common.assertion.expectEqual(selectedItems.length, 2);
    expect(selectedItems[0]).toMatch(/box.\-3$/);
    expect(selectedItems[1]).toMatch(/box.\-6$/);
  });

});
