/**
* @class session
* @memberof ui5.common
*/
const Session = function () {

  //----------------------------------- LOGIN ----------------------------------
  /**
   * @function login
   * @memberOf ui5.common.session
   * @description Login with specific username and password. This function works for both fiori and sap-cloud login.
   * @param {String} username - The username.
   * @param {String} password - The password.
   * @param {Boolean} verify - [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'.
   * @param {Integer} timeout - The timeout to wait (default value: 30 sec).
   * @example await ui5.common.session.login("PURCHASER");
   * @example await ui5.common.session.login("john", "abc123!");
   */
  this.login = async function (username, password, verify, timeout = 30000) {
    let authenticator;
    try {
      await browser.waitUntil(async function () {
        try {
          const fioriFormId = ui5.common.authenticators.fioriForm.formId;
          const elem = await non_ui5.common.locator.getElementByCss(fioriFormId, 0, 7500);
          await non_ui5.common.assertion.isVisible(elem);
          authenticator = ui5.common.authenticators.fioriForm;
          return true;
        } catch (e) {
          // continue
        }
        try {
          const sapCloudFormId = ui5.common.authenticators.sapCloudForm.formId;
          const elem = await non_ui5.common.locator.getElementByCss(sapCloudFormId, 0, 7500);
          await non_ui5.common.assertion.isVisible(elem);
          authenticator = ui5.common.authenticators.sapCloudForm;
          return true;
        } catch (e) {
          return false;
        }
      }, timeout);
      await ui5.common.session.loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error("login failed. Could not find the login page within the given time. \n" + error);
    }
  };

  // use only as internal function
  this.loginWithGenericUser = async function (user, authenticator) {
    console.warn("Deprecation Warning! This function will be removed in the future. Please use one of the following functions: loginFiori, loginSapCloud, login");
    return this.loginWithUsernameAndPassword(user.username, user.password, authenticator);
  };

  // use only as internal function
  this.loginWithUsernameAndPassword = async function (username, password = "Welcome1!", authenticator = ui5.common.authenticators.fioriForm, verify = false) {
    let userNameField = null;
    let passwordField = null;
    let logonField = null;

    try {
      await browser.waitUntil(async function () {
        userNameField = await $(authenticator.usernameFieldSelector);
        passwordField = await $(authenticator.passwordFieldSelector);
        logonField = await $(authenticator.logonButtonSelector);
        return await userNameField.isDisplayedInViewport() &&
          await passwordField.isDisplayedInViewport() &&
          await logonField.isDisplayedInViewport();
      }, { timeout: 60000, timeoutMsg: "expected user name field to be present after 60s" });

      await userNameField.setValue(username);
      await passwordField.setValue(password);
      await logonField.click();
    } catch (error) {
      throw new Error("An exception was caught during the login. " +
        "Possible reasons are: a previous script failed, the system is down, wrong config file. \n" + error);
    }
    if (verify) {
      await ui5.common.assertion.expectShellHeader();
    }
  };

  /**
   * @function loginFiori
   * @memberOf ui5.common.session
   * @description Login with fioriForm and specific username and password.
   * @param {String} username - The username.
   * @param {String} password - The password.
   * @param {Boolean} verify - [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'.
   * @example await ui5.common.session.loginFiori("john", "abc123!");
   */
  this.loginFiori = async function (username, password, verify = false) {
    try {
      const authenticator = await ui5.common.authenticators.fioriForm;
      return await this.loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error(`loginFiori() failed: ${error}`);
    }
  };

  /**
   * @function loginSapCloud
   * @memberOf ui5.common.session
   * @description Login with sapCloud form and specific username and password.
   * @param {String} username - The username.
   * @param {String} password - The password.
   * @param {Boolean} verify - [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'.
   * @example await ui5.common.session.loginSapCloud("john", "abc123!");
   */
  this.loginSapCloud = async function (username, password, verify = false) {
    try {
      const authenticator = await ui5.common.authenticators.sapCloudForm;
      return await this.loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error(`loginSapCloud() failed: ${error}`);
    }
  };

  /**
   * @function loginCustom
   * @memberOf ui5.common.session
   * @description Login with custom form and specific username and password.
   * @param {String} username - The username.
   * @param {String} password - The password.
   * @param {String} usernameFieldSelector - The CSS selector of the username field.
   * @param {String} passwordFieldSelector - The CSS selector of the password field.
   * @param {String} logonButtonSelector - The CSS selector of the login button.
   * @param {Boolean} verify - [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'.
   * @example await ui5.common.session.loginCustom("john", "abc123!", "#j_username", #j_password, "#logOnFormSubmit");
   */
  this.loginCustom = async function (username, password, usernameFieldSelector, passwordFieldSelector, logonButtonSelector, verify = false) {
    try {
      const authenticator = {
        "usernameFieldSelector": usernameFieldSelector,
        "passwordFieldSelector": passwordFieldSelector,
        "logonButtonSelector": logonButtonSelector
      };
      return await this.loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error(`loginCustom() failed: ${error}`);
    }
  };

  /**
   * @function loginCustomViaConfig
   * @memberOf ui5.common.session
   * @description Login with specific username and password. The selectors will be taken from the config.
   * @param {String} username - The username. Can be specified in spec or config. If specified in both credentials will be taken from config!
   * @param {String} password - The password. Can be specified in spec or config. If specified in both credentials will be taken from config!
   * @param {Boolean} verify - [OPTIONAL] Specifies if the function will check the shell header after logging in. Default is 'false'.
   * @example // config - SAMPLE 1
   *auth: {
      formType: 'plain',
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
  },
   *
   * // spec
   * await ui5.common.session.loginCustomViaConfig("john", "abc123!");


   // config - SAMPLE 2
   * auth: {
      username: "PURCH_EXT",
      password: "Welcome1!",
      formType: "plain",
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
  },
   *
   * // spec
   * await ui5.common.session.loginCustomViaConfig();
   */

  this.loginCustomViaConfig = async function (username, password, verify = false) {
    try {
      const baseUrl = browser.config.baseUrl;
      await browser.navigateTo(baseUrl); //?
      if (browser.config.params &&
        browser.config.params.auth &&
        browser.config.params.auth.username &&
        browser.config.params.auth.password) {
        username = browser.config.params.auth.username;
        password = browser.config.params.auth.password;
        console.log("\x1b[33m%s\x1b[0m", "Credentials to login will be taken from config!");
      } else if (!username && !password) {
        throw new Error("username or password is missing! Check your parameters or config file.");
      }
    } catch (error) {
      throw new Error("loginCustomViaConfig(): Function loginCustomViaConfig failed. Please maintain the credentials in your config or spec.: " + error);
    }
    try {
      const authenticator = {
        "usernameFieldSelector": browser.config.params.auth.usernameFieldSelector,
        "passwordFieldSelector": browser.config.params.auth.passwordFieldSelector,
        "logonButtonSelector": browser.config.params.auth.logonButtonSelector
      };
      return await this.loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error("loginCustomViaConfig(): Function loginCustomViaConfig failed. Please maintain the auth values in your config.");
    }
  };

  //---------------------------------- LOGOUT ----------------------------------
  async function clickSignOut() {
    const ui5ControlProperties = {
      "elementProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "id": "*logoutBtn" } }
    };
    await ui5.common.locator.scrollToElement(ui5ControlProperties);
    return ui5.common.userInteraction.click(ui5ControlProperties);
  }

  /**
   * @function logout
   * @memberOf ui5.common.session
   * @description Logs the user out.
   * @param {Boolean} verify - [OPTIONAL] Specifies if the function will check the logout text after logging out.
   * Set this to false if the system does not show this message after logging out. Default is 'false'.
   * @example await ui5.common.session.logout();
   */
  this.logout = async function (verify = true) {
    await ui5.common.navigationBar.clickUserIcon();
    await clickSignOut();
    await ui5.common.confirmationDialog.clickOk();
    if (verify) {
      await ui5.common.assertion.expectLogoutText();
    }
  };

  /**
   * @function switchUser
   * @memberOf ui5.common.session
   * @description switchs the user according to the passed username and password.
   * @param {String} username - The username.
   * @param {String} password - The password.
   * @param {Object} authenticator - The login form type.
   * @param {Number} timeout=8000 - The timeout to wait (default value: 8 sec).
   * @example await ui5.common.session.switchUser("Buyer");
   */
  this.switchUser = async function (username, password, authenticator, timeout = 8000) {
    await this.logout();
    await utilities.browser.sleep(timeout);
    await browser.navigateTo(browser.config.baseUrl);
    return this.loginWithUsernameAndPassword(username, password, authenticator);
  };

};
module.exports = new Session();
