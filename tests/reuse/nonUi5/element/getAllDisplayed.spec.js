const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - getAllDisplayed and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getAllDisplayed("[class='sapMBtnBase sapMBtn sapMBtnInverted sapMDialogBeginButton sapMBarChild']", 4000))
      .rejects.toThrow("Function 'waitForAll' failed");
  });
});

describe("locator - getAllDisplayed", function () {
  let displayedElements;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    displayedElements = await nonUi5.element.getAllDisplayed("[id='sdk---app--changeVersionButton-BDI-content']", 40000);
  });

  it("Verification", async function () {
    expect(displayedElements.length).toBeTruthy();
    await expect(displayedElements[0]).toBeDisplayedInViewport();
    await expect(displayedElements[0].getProperty("id"))
      .resolves.toEqual("sdk---app--changeVersionButton-BDI-content");
  });
});

describe("locator - getAllDisplayed for non-visible element (element is in DOM)", function () {
  let displayedElements;
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    displayedElements = await nonUi5.element.getAllDisplayed("[class='sapUiInvisibleText']");
  });

  it("Verification", async function () {
    expect(displayedElements.length).toBe(0);
  });
});