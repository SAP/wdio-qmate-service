const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - clearAndFillActive", function () {
  let value;
  let valueAct;
  let attribute;
  let selector;

  it("Preparation", async function () {
    await browser.navigateTo(
      "https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview"
    );
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smartfield.Overview.Main",
        metadata: "sap.m.TextArea"
      }
    };
    value = "My Value";
    attribute = "value";
    await ui5.userInteraction.click(selector);
    await common.userInteraction.clearAndFillActive(value);

    const quantityInput = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smartfield.Overview.Main",
        metadata: "sap.m.Input",
        value: [
          {
            path: "Quantity"
          }
        ]
      }
    };
    await ui5.userInteraction.click(quantityInput);
    valueAct = await ui5.element.getValue(selector);
  });

  it("Verification", function () {
    common.assertion.expectEqual(value, valueAct);
  });
});

describe("userInteraction - clearAndFillActive with invalid selector", function () {
  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m..InputDescription.V",
        metadata: "sap.ut",
        id: "__iut4"
      }
    };
    value = "My Value";
    await expect(ui5.userInteraction.click(selector)).rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - clearAndFillActive with wrong element", function () {
  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MenuButton/sample/sap.m.sample.MenuButton");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.MenuButton.MB",
        metadata: "sap.m.Button",
        text: "File Menu"
      },
      ancestorProperties: {
        metadata: "sap.m.SplitButton",
        viewName: "sap.m.sample.MenuButton.MB"
      }
    };

    value = "My Value";
    // Timeout was increased to avoid an error "Element not clickable after 30s"
    await ui5.userInteraction.click(selector, 0, 60000);
    await expect(common.userInteraction.clearAndFillActive(value)).rejects.toThrow("invalid element state");
  });
});
