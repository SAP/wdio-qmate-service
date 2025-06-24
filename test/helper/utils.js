exports.handleCookiesConsent = async function handleCookiesConsent() {
  // eslint-disable-next-line no-undef
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
    const testCookie = await browser.getCookies(["cmapi_cookie_privacy"]);
    if (testCookie.length > 0) {
      // cookie already set
      return;
    }
    const newCookiesConsentDialog = "button[id='truste-consent-button']";
    await browser.waitUntil(
      async () => {
        try {
          await Promise.any([ui5.userInteraction.click(oldCookiesConsentDialog, 0, 500), nonUi5.userInteraction.click(newCookiesConsentDialog, 0, 500)]);
          return true;
        } catch (error) {
          // Ignore error and continue to next promise
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
