exports.handleCookiesConsent = async function handleCookiesConsent() {
  await util.function.executeOptional(async function () {
    const oldCookiesConsentDialog = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.App",
        metadata: "sap.m.Button",
        text: [
          {
            path: "i18n>COOKIE_SETTINGS_DIALOG_FUNCTIONAL_COOKIES_ACCEPT_ALL"
          }
        ]
      }
    };
    const testCookie = await browser.getCookies({ name: "cmapi_cookie_privacy" });
    if (testCookie.length > 0) {
      // cookie already set
      return;
    }
    const newCookiesConsentDialog = "button[id='truste-consent-button']";
    await browser.waitUntil(
      async () => {
        try {
          // Consent belongs to the top-level page, even when a previous test used an iframe.
          const button = await browser.$(newCookiesConsentDialog);
          if (await button.isExisting()) {
            await button.waitForClickable({ timeout: 5000 });
            await button.click();
            await button.waitForDisplayed({ reverse: true, timeout: 5000 });
          } else if (await browser.$(".sapMDialog").isExisting()) {
            // Do not start UI5 auto-waiting while the modern consent UI is still loading.
            await ui5.userInteraction.click(oldCookiesConsentDialog, 0, 5000);
          } else {
            return false;
          }
          return true;
        } catch (error) {
          // The consent UI can appear after navigation has resolved; retry until it is ready.
          return false;
        }
      },
      {
        timeout: 15000,
        timeoutMsg: "Cookies consent dialog not found",
        interval: 100
      }
    );
  }, []);
};
