exports.handleCookiesConsent = async function handleCookiesConsent() {
  // eslint-disable-next-line no-undef
  await util.function.executeOptional(async function () {
    const oldCookiesConsentDialog = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>COOKIE_SETTINGS_DIALOG_FUNCTIONAL_COOKIES_ACCEPT_ALL"
        }]
      }
    };
    const newCookiesConsentDialog = "button[id='truste-consent-button']";
    await Promise.any([
      ui5.userInteraction.click(oldCookiesConsentDialog, 0, 15000),
      nonUi5.userInteraction.click(newCookiesConsentDialog, 0, 15000)
    ]);
  }, []);
};