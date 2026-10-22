"use strict";

// =================== CONSTANTS ==========================================
const NEGATIVE_TEST_TIMEOUT = 10_000;

// =================== TESTS ==============================================

describe("navigationBar - clickUserIcon", async function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.navigationBar.expectShellHeader();
  });

  it("Execution", async function () {
    await ui5.navigationBar.clickUserIcon();
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        metadata: "sap.m.List",
        bindingContextPath: "/userActions"
      }
    };
    await ui5.assertion.expectToBeVisible(selector, 0, 60000);
  });
});

describe("navigationBar - clickUserIcon - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://www.sap.com");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.clickUserIcon(NEGATIVE_TEST_TIMEOUT)).rejects.toThrow(`Could not click User Icon in ${NEGATIVE_TEST_TIMEOUT / 1000}s`);
  });
});
