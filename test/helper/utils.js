exports.handleCookiesConsent = async function handleCookiesConsent() {
  // eslint-disable-next-line no-undef
  await util.function.executeOptional(async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>COOKIE_SETTINGS_DIALOG_FUNCTIONAL_COOKIES_ACCEPT_ALL"
        }]
      }
    };
    await ui5.userInteraction.click(selector, 0, 15000);
  }, []);
};