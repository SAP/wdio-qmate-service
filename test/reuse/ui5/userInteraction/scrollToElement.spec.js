"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");

describe("element - scrollToElement - preserves page while centering a visible frame option", function () {
  after(async function () {
    await util.browser.switchToDefaultContent();
  });

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("#sampleFrame");
  });

  it("Execution & Verification", async function () {
    const pageUrl = await browser.getUrl();
    await ui5.userInteraction.clickSelectArrow({ elementProperties: { metadata: "sap.m.MultiComboBox" } });
    const selector = {
      elementProperties: { metadata: "sap.m.CheckBox" },
      parentProperties: { metadata: "sap.m.StandardListItem", mProperties: { title: "Beam Breaker B-2" } }
    };
    const option = await ui5.element.getDisplayed(selector);

    await ui5.userInteraction.scrollToElement(selector);

    expect(await browser.getUrl()).toEqual(pageUrl);
    expect(await option.isDisplayed()).toBe(true);
    await common.userInteraction.pressEscape();
  });
});

describe("element - scrollToElement - default, no args", function () {
  it("Preparation", async function () {
    await browser.url(`${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3`);
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Welcome",
        metadata: "sap.m.Title",
        text: [
          {
            path: "i18n>promotedTitle"
          }
        ]
      }
    };
    const index = 0;
    const alignment = "start";
    const timeout = 30000;
    await ui5.userInteraction.scrollToElement(selector, index, alignment, timeout);
    await ui5.assertion.expectToBeVisible(selector);
  });
});

describe("element - scrollToElement - with custom alignment options ", function () {
  it("Preparation", async function () {
    await browser.url(`${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3`);
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Welcome",
        metadata: "sap.m.Title",
        text: [
          {
            path: "i18n>promotedTitle"
          }
        ]
      }
    };
    const index = 0;
    const alignmentOptions = { inline: "nearest", block: "start" };
    const timeout = 30000;
    await ui5.userInteraction.scrollToElement(selector, index, alignmentOptions, timeout);
    await ui5.assertion.expectToBeVisible(selector);
  });
});

describe("element - scrollToElement outside of viewpoint", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selectorForDropdownList = {
      elementProperties: {
        viewName: "sap.m.sample.MultiComboBox.view.MultiComboBox",
        metadata: "sap.m.MultiComboBox"
      }
    };
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.MultiComboBox.view.MultiComboBox",
        metadata: "sap.m.StandardListItem",
        title: "Smart Games"
      }
    };

    await ui5.userInteraction.clickSelectArrow(selectorForDropdownList);
    await ui5.userInteraction.scrollToElement(selector);
    await ui5.userInteraction.click(selector);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.MultiComboBox.view.MultiComboBox",
        metadata: "sap.m.Token"
      }
    };
    await ui5.assertion.expectAttributeToBe(selector, "text", "Smart Games");
  });
});

describe("element - scrollToElement and catch error", function () {
  it("Preparation", async function () {
    await browser.url(`${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3`);
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "ghgjho.cart.view.Welcome",
        metadata: "",
        text: [
          {
            path: "i18n>promotedTitle"
          }
        ]
      }
    };
    const index = 0;
    const alignment = "start";
    const timeout = 30000;
    await expect(ui5.userInteraction.scrollToElement(selector, index, alignment, timeout)).rejects.toThrow(/No visible elements found/);
  });
});
