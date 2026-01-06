"use strict";

describe("browser - reloadSession", function () {
  it("Preparation", async function () {
    await browser.navigateTo(browser.config.baseUrl);

    // Updated selector for the new cookie consent button
    const newCookiesConsentDialog = "button[id='truste-consent-button']";
    nonUi5.userInteraction.click(newCookiesConsentDialog, 0, 15000);
  });

  it("Execution", async function () {
    await util.browser.reloadSession();
  });

  it("Verification", async function () {
    await browser.navigateTo(browser.config.baseUrl);

    // Updated selector for the new cookie consent button
    const newCookiesConsentDialog = "button[id='truste-consent-button']";

    // Verify if the new cookie consent button is displayed after util.browser.reloadSession
    await nonUi5.element.waitToBeVisible(newCookiesConsentDialog);
  });
});