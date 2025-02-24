exports.handleCookiesConsent = async function handleCookiesConsent() {
  // eslint-disable-next-line no-undef
  await util.function.executeOptional(async function () {
    const oldCookiesDialog = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>COOKIE_SETTINGS_DIALOG_FUNCTIONAL_COOKIES_ACCEPT_ALL"
        }]
      }
    };
    const newCookiesConsentDialog = "button[id='truste-consent-button']";
    await Promise.race([
      ui5.userInteraction.click(oldCookiesDialog, 0, 15000),
      nonUi5.userInteraction.click(newCookiesConsentDialog, 0, 15000)
    ]);
  }, []);
};