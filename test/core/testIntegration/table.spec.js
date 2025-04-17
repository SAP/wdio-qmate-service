/* eslint-disable no-undef */
const { handleCookiesConsent } = require("../../helper/utils");
describe("table", function () {

  it("step1:getChild", async function () {
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.ColumnListItem", "mProperties": { "bindingContextPath": "/ProductCollection/2" } },
      "parentProperties": { "metadata": "sap.m.Table", "mProperties": { "items": [{ "path": "/ProductCollection" }] } },
    };
    var list = await ui5.element.getDisplayed(ui5ControlProperties, 0);

    var ui5ControlProperties2 = {
      "elementProperties": { "metadata": "sap.m.Text", "mProperties": {} },
    };

    const nameField = await list.uiControl(ui5ControlProperties2);
    var attribute = "text";   //eg: title, text, value etc.
    var compareValue = "Notebook Basic 18";   //expected value
    await expect(await nameField.getAttribute("data-" + attribute)).toBe(compareValue);
  });


  it("step1:click on edit", async function () {
    //----------------------- Block for sap.m.Button - Perform Click -----------------------
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Button", "mProperties": { "text": "Edit" } },
      "parentProperties": { "metadata": "sap.m.OverflowToolbar", "mProperties": {} },
      "prevSiblingProperties": { "metadata": "sap.m.ToolbarSpacer", "mProperties": {} },
      "nextSiblingProperties": {},
      "childProperties": {}
    };
    await ui5.userInteraction.click (ui5ControlProperties);
  });

  it("step2:enter value for 3rd element", async function () {
    var ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.Input", "mProperties": { "description": "PC" } },
      "parentProperties": { "metadata": "sap.m.ColumnListItem", "mProperties": {} },
      "prevSiblingProperties": { "metadata": "sap.m.Input", "mProperties": {} },
      "nextSiblingProperties": { "metadata": "sap.m.Input", "mProperties": { "description": "KG" } },
      "childProperties": {}
    };
    var value = "20";   //value to be entered by user
    var id = await ui5.element.getId(ui5ControlProperties);
    await $("[id='" + id + "'] input").clearValue();
    await $("[id='" + id + "'] input").setValue(value);
    //await ui5.userInteraction.clearAndFill(ui5ControlProperties, value);
  });

  it("step3:enter value for 4rd element with ancestor", async function () {
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Input", "mProperties": {
          "bindingContextPath": "/ProductCollection/3",
          "value": { "path": "Quantity" }
        }
      },
      "parentProperties": {
        "metadata": "sap.m.ColumnListItem", "mProperties": {
          "bindingContextPath": "/ProductCollection/3"
        }
      },
      "ancestorProperties": {
        "metadata": "sap.m.Table", "mProperties": {
          "items": { "path": "/ProductCollection" }
        }
      },
      "siblingProperties": {
        "metadata": "sap.m.Input", "mProperties": {
          "value": { "path": "Name" }
        }
      }
    };
    var value = "99";   //value to be entered by user
    var id = await ui5.element.getId(ui5ControlProperties);
    await $("[id='" + id + "'] input").clearValue();
    await $("[id='" + id + "'] input").setValue(value);
  });
});
