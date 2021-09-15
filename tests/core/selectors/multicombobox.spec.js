/* eslint-disable no-undef */
var ui5ControlConverter = require("../../ui5ControlConverter");

describe("multi combo", function () {
  it("step1:click on arrow of multicombo", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.MultiComboBox", "mProperties": {} },
      "parentProperties": { "metadata": "sap.ui.layout.VerticalLayout", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": { "metadata": "sap.m.Tokenizer", "mProperties": {} }
    };
    var id = await common.locator.getElementId(ui5ControlProperties);
    await element(by.css("[id='" + id + "-arrow']")).click();
  });

  it("step2:select item 1", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.CheckBox", "mProperties": {} },
      "parentProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": "Astro Phone 6" } },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("step3:select item 2", async function () {
    //----------------------- Block for sap.m.CheckBox - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.CheckBox", "mProperties": {} },
      "parentProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": "Beam Breaker B-2" } },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await common.userInteraction.click(ui5ControlProperties);
  });

  it("step4: assert selected items", async function () {
    //----------------------- Block for sap.m.CheckBox - Perform Click -----------------------
    //----------------------- Block for sap.m.MultiComboBox - Perform Assert -----------------------
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiComboBox", "mProperties": {
          "selectedItems": "*__box0-3,*__box0-6",
          "items": { "path": "/ProductCollection" }
        }
      },
      "parentProperties": { "metadata": "sap.ui.layout.VerticalLayout", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": { "metadata": "sap.m.Tokenizer", "mProperties": {} }
    };
    var Index = 0;
    var attribute = "selectedKeys";   //eg: title, text, value etc.
    var compareValue = "HT-1252,HT-6101";   //expected value
    await common.assertion.expectAttributeToBe(ui5ControlProperties, attribute, compareValue, Index);
  });

  it("step4: assert selected items - use UI5 Control properties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiComboBox", "mProperties": {
          "selectedItems": "*__box0-3,*__box0-6",
          "items": { "path": "/ProductCollection" }
        }
      },
      "parentProperties": { "metadata": "sap.ui.layout.VerticalLayout", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": { "metadata": "sap.m.Tokenizer", "mProperties": {} }
    };
    var Index = 0;
    var attribute = "selectedKeys";   //eg: title, text, value etc.
    var compareValue1 = "HT-1252";   //expected value
    var compareValue2 = "HT-6101";   //expected value
    var elem = await common.locator.getDisplayedElement(ui5ControlProperties, Index);
    var aVal = await ui5ControlConverter.getControlProperty(elem, attribute);
    await expect(aVal[0]).toBe(compareValue1);
    await expect(aVal[1]).toBe(compareValue2);
  });

  it("step4: assert selected items - use UI5 Association Control properties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiComboBox", "mProperties": {
          "selectedItems": "*__box0-3,*__box0-6",
          "items": { "path": "/ProductCollection" }
        }
      },
      "parentProperties": { "metadata": "sap.ui.layout.VerticalLayout", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": { "metadata": "sap.m.Tokenizer", "mProperties": {} }
    };
    var Index = 0;
    var attribute = "selectedItems";   //eg: title, text, value etc.
    var compareValue1 = "__box0-3";   //expected value
    var compareValue2 = "__box0-6";   //expected value
    var elem = await common.locator.getDisplayedElement(ui5ControlProperties, Index);
    var aVal = await ui5ControlConverter.getControlAssociationProperty(elem, attribute);
    //console.log(aVal);
    await expect(aVal[0]).toContain(compareValue1);
    await expect(aVal[1]).toContain(compareValue2);
  });

  it("step5: assert selected keys - use UI5 Association Control properties", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.MultiComboBox", "mProperties": {
          "selectedKeys": ["HT*1252", "HT-6101"],
          "items": { "path": "/ProductCollection" }
        }
      },
      "parentProperties": { "metadata": "sap.ui.layout.VerticalLayout", "mProperties": {} },
      "prevSiblingProperties": {},
      "nextSiblingProperties": {},
      "childProperties": { "metadata": "sap.m.Tokenizer", "mProperties": {} }
    };
    var Index = 0;
    var attribute = "selectedKeys";   //eg: title, text, value etc.
    var compareValue1 = "HT-1252";   //expected value
    var compareValue2 = "HT-6101";   //expected value
    var elem = await common.locator.getDisplayedElement(ui5ControlProperties, Index);
    var aVal = await ui5ControlConverter.getControlProperty(elem, attribute);
    //console.log(aVal);
    await expect(aVal[0]).toBe(compareValue1);
    await expect(aVal[1]).toBe(compareValue2);
  });
});
