const {
  handleCookiesConsent
} = require("../../../../helper/utils");

describe("locator - getDisplayedElements and catch error", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.getDisplayedElements("[class='sapMBtnBase sapMBtn sapMBtnInverted sapMDialogBeginButton sapMBarChild']", 4000))
      .rejects.toThrow("Function 'waitForAllElements' failed");
  });
});

describe("locator - getDisplayedElements", function () {
  let displayedElements;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    displayedElements = await non_ui5.common.locator.getDisplayedElements("[id='sdk---app--changeVersionButton-BDI-content']", 40000);
  });

  it("Verification", async function () {
    expect(displayedElements.length).toBeTruthy();
    await expect(displayedElements[0]).toBeDisplayedInViewport();
    await expect(displayedElements[0].getProperty("id"))
      .resolves.toEqual("sdk---app--changeVersionButton-BDI-content");
  });
});

describe("locator - getDisplayedElements for non-visible element (element is in DOM)", function () {
  let displayedElements;
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    displayedElements = await non_ui5.common.locator.getDisplayedElements("[class='sapUiInvisibleText']");
  });

  it("Verification", async function () {
    expect(displayedElements.length).toBe(0);
  });
});