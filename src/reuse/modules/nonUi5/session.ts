"use strict";
/**
 * @class session
 * @memberof nonUi5
 */
export class Session {
// =================================== LOGIN ===================================
/**
 * @function loginSapNetWeaver
 * @memberOf nonUi5.session
 * @description Login for SAP NetWebGUI form and specific username and password.
 * @param {String} username - The username.
 * @param {String} password - The password.
 * @param {Boolean} [clickContinue=true] - Specifies if the function will press continue if applicable.
 * @param {String} [iframeCssSelector="iframe"] - The specific iframe selector the login form is contained.
 * @example await nonUi5.session.loginSapNetWeaver("john", "abc123!");
 */
  async loginSapNetWeaver(username: string, password: string, clickContinue = true, iframeCssSelector = "iframe") {
    await util.browser.switchToIframe(iframeCssSelector);
    await ui5.session.loginCustom(username, password, "#sap-user", "#sap-password", "#LOGON_BUTTON");
    if (clickContinue) {
      await util.function.executeOptional(async () => {
        const continueButton = await nonUi5.element.getByCss("DIV[id*='CONTINUE_BUTTON']", 0, 5000);
        await nonUi5.userInteraction.click(continueButton);
      });
    }
    await util.browser.switchToDefaultContent();
  }

}
export default new Session();
