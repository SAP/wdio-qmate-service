
const chai = require("chai")
  , expect = chai.expect
  , should = chai.should();
const assert = require("assert");

describe("webdriver.io page locator test", function () {

  it("step1:click on the first standard item check id with wildcard", async function () {
    await browser.url("#/categories");
    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "id": "*categoryList-0",
        "bindingContextPath": "/ProductCategories('AC')"
      }
    };
    var elem = await browser.uiControl(ui5ControlProperties);
    await elem.click();
  });

  it("step1:navigate back to main page", async function () {

    var ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "type": "Back"
      },
      "childProperties": {
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://nav-back"
      }
    };
    var elems = await browser.uiControls(ui5ControlProperties);
    await assert.ok(elems.length === 1);
    await elems[0].click();
  });
});