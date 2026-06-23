const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");

// =================== CONSTANTS ==========================================
const NEGATIVE_TEST_TIMEOUT = 10_000;

// =================== TESTS ==============================================

describe("userInteraction - click", function () {
  it("Preparation", async function () {
    await browser.navigateTo(`${BASE_URL}/`);
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.App",
        metadata: "sap.m.IconTabFilter",
        id: "*apiMasterTab"
      }
    };
    await ui5.userInteraction.click(selector, 0, 60000);
  });

  it("Verification", async function () {
    await common.assertion.expectUrlToBe(`${BASE_URL}/#/api`);
  });
});

describe("userInteraction - click on not displayed element", function () {
  it("Preparation", async function () {
    await browser.navigateTo(`${BASE_URL}/`);
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.ApiDetailInitial",
        metadata: "sap.ui.documentation.TitleLink",
        text: "Main Controls"
      }
    };
    const index = 0;
    await expect(ui5.userInteraction.click(selector, index, NEGATIVE_TEST_TIMEOUT)).rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - click on invisible element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/category/AC/product/HT-2000`);
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Product",
        metadata: "sap.m.Button",
        text: [
          {
            path: "i18n>addToCartShort"
          }
        ]
      }
    };
    const index = 0;
    const timeout = 30000;
    await ui5.userInteraction.click(selector, index, timeout);
    await browser.pause(1000);
    await expect(ui5.userInteraction.click(selector, index, NEGATIVE_TEST_TIMEOUT)).rejects.toThrow(/No visible elements found with selector/);
  });
});

describe("userInteraction - click with selector having wildcard character(*) for metadata", function () {
  it("Preparation", async function () {
    await browser.navigateTo(`${BASE_URL}/`);
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.App",
        metadata: "sap.m.*",
        id: "*apiMasterTab"
      }
    };
    await ui5.userInteraction.click(selector, 0, 60000);
  });

  it("Verification", async function () {
    await common.assertion.expectUrlToBe(`${BASE_URL}/#/api`);
  });
});

describe("userInteraction - click disabled button (negative test)", function () {
  const selector = {
    elementProperties: {
      metadata: "sap.m.Button",
      text: "Transient Message"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo(`${BASE_URL}/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#/?sap-iapp-state=3&sap-iapp-state--history=1`);
  });

  it("Execution && Verification", async function () {
    await expect(ui5.userInteraction.click(selector, 0, NEGATIVE_TEST_TIMEOUT)).rejects.toThrow(/Element is not clickable after/);
  });
});

describe("userInteraction - click unblocked button and ignore blocked one", function () {
  const createButtonSelector = {
    elementProperties: {
      metadata: "sap.m.Button",
      text: "Create"
    }
  };
  const currencyCodeSelector = {
    elementProperties: {
      metadata: "sap.m.Title",
      text: "Select: ISO Currency Code"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo(`${BASE_URL}/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#/?sap-iapp-state=3&sap-iapp-state--history=1`);
    await ui5.userInteraction.click(createButtonSelector);
    const valueHelpIconSelector = {
      elementProperties: {
        metadata: "sap.ui.core.Icon",
        alt: "Show Value Help",
        ancestorProperties: {
          tooltipLabel: "EPM: Total Gross Amount"
        }
      }
    };
    await ui5.userInteraction.click(valueHelpIconSelector);
    await ui5.assertion.expectToBeVisible(currencyCodeSelector);
  });

  it("Execution", async function () {
    const cancelButtonSelector = {
      elementProperties: {
        metadata: "sap.m.Button",
        text: "Cancel"
      }
    };
    await ui5.userInteraction.click(cancelButtonSelector, 0, 30000);
  });

  it("Verification", async function () {
    await ui5.assertion.expectToBeNotVisible(currencyCodeSelector, NEGATIVE_TEST_TIMEOUT);
  });
});
