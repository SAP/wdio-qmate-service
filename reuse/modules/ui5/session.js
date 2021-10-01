"use strict";
/**
 * @class session
 * @memberof ui5
 */
const Session = function () {

  // =================================== LOGIN ===================================
  /**
   * @function login
   * @memberOf ui5.session
   * @description Login with specific username and password. This function works for both fiori and sap-cloud login.
   * @param {String} username - The username.
   * @param {String} [password="super-duper-sensitive-pw"] - The password.
   * @param {Boolean} [verify=false] - Specifies if the function will check the shell header after logging in.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.session.login("PURCHASER");
   * @example await ui5.session.login("JOHN_DOE", "abc123!", true);
   */
  this.login = async function (username, password = "super-duper-sensitive-pw", verify = false, timeout = 30000) {
    if (!username) {
      throw new Error("Please provide a valid username.");
    }

    let authenticator;
    try {
      await browser.waitUntil(async function () {
        try {
          const fioriFormId = ui5.authenticators.fioriForm.formId;
          const elem = await nonUi5.element.getElementByCss(fioriFormId, 0, 7500);
          await nonUi5.element.isVisible(elem);
          authenticator = ui5.authenticators.fioriForm;
          return true;
        } catch (e) {
          // continue
        }
        try {
          const sapCloudFormId = ui5.authenticators.sapCloudForm.formId;
          const elem = await nonUi5.element.getElementByCss(sapCloudFormId, 0, 7500);
          await nonUi5.element.isVisible(elem);
          authenticator = ui5.authenticators.sapCloudForm;
          return true;
        } catch (e) {
          return false;
        }
      }, timeout);
      await _loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error("login failed. Could not find the login page within the given time. \n" + error);
    }
  };

  /**
   * @function loginFiori
   * @memberOf ui5.session
   * @description Login with fioriForm and specific username and password.
   * @param {String} username - The username.
   * @param {String} [password="super-duper-sensitive-pw"] - The password.
   * @param {Boolean} [verify=false] - Specifies if the function will check the shell header after logging in.
   * @example await ui5.session.loginFiori("john", "abc123!");
   */
  this.loginFiori = async function (username, password, verify = false) {
    if (!username) {
      throw new Error("Please provide a valid username.");
    }

    try {
      const authenticator = await ui5.authenticators.fioriForm;
      return await _loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error(`Function 'loginFiori' failed: ${error}`);
    }
  };

  /**
   * @function loginSapCloud
   * @memberOf ui5.session
   * @description Login with sapCloud form and specific username and password.
   * @param {String} username - The username.
   * @param {String} [password="super-duper-sensitive-pw"] - The password.
   * @param {Boolean} [verify=false] - Specifies if the function will check the shell header after logging in.
   * @example await ui5.session.loginSapCloud("john", "abc123!");
   */
  this.loginSapCloud = async function (username, password, verify = false) {
    if (!username) {
      throw new Error("Please provide a valid username.");
    }

    try {
      const authenticator = await ui5.authenticators.sapCloudForm;
      return await _loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error(`Function 'loginSapCloud' failed: ${error}`);
    }
  };

  /**
   * @function loginCustom
   * @memberOf ui5.session
   * @description Login with custom form and specific username and password.
   * @param {String} username - The username.
   * @param {String} [password="super-duper-sensitive-pw"] - The password.
   * @param {String} usernameFieldSelector - The CSS selector of the username field.
   * @param {String} passwordFieldSelector - The CSS selector of the password field.
   * @param {String} logonButtonSelector - The CSS selector of the login button.
   * @param {Boolean} [verify=false] - Specifies if the function will check the shell header after logging in.
   * @example await ui5.session.loginCustom("JOHN_DOE", "abc123!", "#username", #password, "#logon");
   */
  this.loginCustom = async function (username, password = "super-duper-sensitive-pw", usernameFieldSelector, passwordFieldSelector, logonButtonSelector, verify = false) {
    if (!username) {
      throw new Error("Please provide a valid username.");
    }

    try {
      const authenticator = {
        "usernameFieldSelector": usernameFieldSelector,
        "passwordFieldSelector": passwordFieldSelector,
        "logonButtonSelector": logonButtonSelector
      };
      return await _loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error(`Function 'loginCustom' failed: ${error}`);
    }
  };

  /**
   * @function loginCustomViaConfig
   * @memberOf ui5.session
   * @description Login with specific username and password. The selectors will be taken from the config.
   * @param {String} username - The username. Can be specified in spec or config. If specified in both credentials will be taken from config.
   * @param {String} [password="super-duper-sensitive-pw" - The password. Can be specified in spec or config. If specified in both credentials will be taken from config.
   * @param {Boolean} [verify=false] - Specifies if the function will check the shell header after logging in.
   * @example // config - SAMPLE 1
    auth: {
      formType: 'plain',
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
    },
    // spec
    await ui5.session.loginCustomViaConfig("JOHN_DOE", "abc123!");


    // config - SAMPLE 2
    auth: {
      formType: "plain",
      username: "PURCH_EXT",
      password: "super-duper-sensitive-pw",
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
    },
    // spec
    await ui5.session.loginCustomViaConfig();
   */

  this.loginCustomViaConfig = async function (username, password = "super-duper-sensitive-pw", verify = false) {
    try {
      const baseUrl = browser.config.baseUrl;
      await browser.navigateTo(baseUrl);
      if (browser.config.params &&
        browser.config.params.auth &&
        browser.config.params.auth.username &&
        browser.config.params.auth.password) {
        username = browser.config.params.auth.username;
        password = browser.config.params.auth.password;
        util.console.info("\x1b[33m%s\x1b[0m", "Login credentials will be taken from config.");
      } else if (!username && !password) {
        throw new Error("Username or password is missing. Check your parameters or config file.");
      }
    } catch (error) {
      throw new Error("Function 'loginCustomViaConfig' failed: Please maintain the credentials in your config or spec.: " + error);
    }
    try {
      const authenticator = {
        "usernameFieldSelector": browser.config.params.auth.usernameFieldSelector,
        "passwordFieldSelector": browser.config.params.auth.passwordFieldSelector,
        "logonButtonSelector": browser.config.params.auth.logonButtonSelector
      };
      return await _loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      throw new Error("Function 'loginCustomViaConfig' failed. Please maintain the auth values in your config.");
    }
  };


  // =================================== LOGOUT / SWITCH ===================================
  /**
   * @function logout
   * @memberOf ui5.session
   * @description Logs the user out.
   * @param {Boolean} [verify="true"] - Specifies if the function will check the logout text after logging out.
   * Set this to false if the system does not show the text after logging out.
   * @example await ui5.session.logout();
   */
  this.logout = async function (verify = true) {
    await ui5.navigationBar.clickUserIcon();
    await _clickSignOut();
    await ui5.confirmationDialog.clickOk();

    if (verify) {
      await ui5.session.expectLogoutText();
    }
  };

  /**
   * @function switchUser
   * @memberOf ui5.session
   * @description switches the user according to the passed username and password.
   * @param {String} username - The username.
   * @param {String} [password="super-duper-sensitive-pw"] - The password.
   * @param {Object} [authenticator] - The login form type. Set to null to use generic login.
   * @param {Number} [wait=10000] - The waiting time between logout and login (ms).
   * @example await ui5.session.switchUser("PURCHASER");
   * @example const authenticator = ui5.authenticators.fioriForm;
   * await ui5.session.switchUser("PURCHASER", "super-duper-sensitive-pw", authenticator, 30000);
   */
  this.switchUser = async function (username, password = "super-duper-sensitive-pw", authenticator, wait = 10000) {
    await this.logout();
    await util.browser.sleep(wait);
    await browser.navigateTo(browser.config.baseUrl);
    if (!authenticator) {
      this.login(username, password);
    } else {
      _loginWithUsernameAndPassword(username, password, authenticator);
    }
  };


  // =================================== ASSERTION ===================================
  /**
   * @function expectLogoutText
   * @memberOf ui5.session
   * @description Expects the logout text after logout to be "You have been logged off.
   * This is essential for chaining scripts, so that no static browser sleep in the spec itself is required anymore.
   * @example await ui5.session.expectLogoutText();
   */
  this.expectLogoutText = async function () {
    const elem = await nonUi5.element.getElementById("msgText");
    await nonUi5.assertion.expectToBeVisible(elem);
  };


  // =================================== HELPER ===================================
  async function _loginWithUsernameAndPassword(username, password = "super-duper-sensitive-pw", authenticator = ui5.authenticators.fioriForm, verify = false) {
    let usernameField = null;
    let passwordField = null;
    let logonField = null;

    try {
      await browser.waitUntil(async function () {
        usernameField = await $(authenticator.usernameFieldSelector);
        passwordField = await $(authenticator.passwordFieldSelector);
        logonField = await $(authenticator.logonButtonSelector);
        return await usernameField.isDisplayedInViewport() &&
          await passwordField.isDisplayedInViewport() &&
          // eslint-disable-next-line no-return-await
          await logonField.isDisplayedInViewport();
      }, {
        timeout: 60000,
        timeoutMsg: "expected user name field to be present after 60s"
      });

      await usernameField.setValue(username);
      await passwordField.setValue(password);
      await logonField.click();
    } catch (error) {
      throw new Error("An exception was caught during the login. " +
        "Possible reasons are: the system is down, a previous script failed, errors in config file. \n" + error);
    }

    if (verify) {
      await ui5.navigationBar.expectShellHeader();
    }

    // await _logUI5Version(); // TODO: not working - > endless loading
  }

  async function _clickSignOut() {
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.StandardListItem",
        "mProperties": {
          "id": "*logoutBtn"
        }
      }
    };
    await ui5.element.scrollToElement(selector);
    return ui5.userInteraction.click(selector);
  }

  //TODO: move to common as global function
  async function _logUI5Version() {
    let logUI5Version;

    try {
      logUI5Version = await browser.config.params.logUI5Version;
    } catch (error) {
      logUI5Version = true;
    }

    if (logUI5Version !== false && !process.env.UI5_VERSION_LOGGED) {
      const ui5Version = await util.browser.getUI5Version();
      util.console.log("");
      util.console.info(`UI5 Version:\t${ui5Version.version}`);
      util.console.info(`UI5 Timestamp:\t${ui5Version.timestamp}`);
      util.console.log("");

      if (logUI5Version !== "always") {
        process.env.UI5_VERSION_LOGGED = true;
      }
    }
  }

};
module.exports = new Session();