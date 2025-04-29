"use strict";

describe("browser - clearBrowser", function () {
  it("Preparation", async function () {
    await browser.navigateTo(browser.config.baseUrl);

    // Updated selector for the new cookie consent button
    const newCookiesConsentDialog = "button[id='truste-consent-button']";
    nonUi5.userInteraction.click(newCookiesConsentDialog, 0, 15000);
  });

  it("Execution", async function () {
    await util.browser.clearBrowser(true, true, true);
  });

  it("Verification", async function () {
    await util.browser.refresh();

    // Updated selector for the new cookie consent button
    const newCookiesConsentDialog = "button[id='truste-consent-button']";

    // Verify if the new cookie consent button is displayed after clearing the browser cache
    await nonUi5.element.waitToBeVisible(newCookiesConsentDialog);
  });
});