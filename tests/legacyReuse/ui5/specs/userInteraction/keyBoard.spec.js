const { handleCookiesConsent } = require("../../../../helper/utils");

describe("userInteraction - pressEnter", function () {

  it("Execution", async function () {
    await ui5.common.userInteraction.pressEnter();
  });

});

describe("userInteraction - pressF4", function () {

  it("Execution", async function () {
    await ui5.common.userInteraction.pressF4();
  });

});

describe("userInteraction - pressTab", function () {

  it("Execution", async function () {
    await ui5.common.userInteraction.pressTab();
  });

});

describe("userInteraction - pressBackspace", function () {

  it("Execution", async function () {
    await ui5.common.userInteraction.pressBackspace();
  });

});

describe("userInteraction - pressArrowLeft", function () {

  it("Execution", async function () {
    await ui5.common.userInteraction.pressArrowLeft();
  });

});

describe("userInteraction - pressArrowRight", function () {

  it("Execution", async function () {
    await ui5.common.userInteraction.pressArrowRight();
  });

});

describe("userInteraction - pressEscape", function () {

  it("Execution", async function () {
    await ui5.common.userInteraction.pressEscape();
  });

});

describe("userInteraction - selectAll", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Input/sample/sap.m.sample.InputValueState");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.InputValueState.V",
        "metadata": "sap.m.Input",
        "value": "Value state None"
      }
    };
    await ui5.common.userInteraction.selectAll(selector);
  });

});
