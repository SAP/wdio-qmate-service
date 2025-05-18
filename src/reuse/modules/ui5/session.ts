"use strict";

import { VerboseLoggerFactory, InactiveLogger, ActiveLogger } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class session
 * @memberof ui5
 */
export class Session {
  private vlf = new VerboseLoggerFactory("ui5", "session");
  private ErrorHandler = new ErrorHandler();

  // =================================== LOGIN ===================================
  /**
   * @function login
   * @memberOf ui5.session
   * @description Login with specific username and password. This function works for both fiori and sap-cloud login.
   * @param {String} username - The username.
   * @param {String} [password] - The password.
   * @param {Boolean} [verify=false] - Specifies if the function will check the shell header after logging in.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.session.login("PURCHASER");
   * @example await ui5.session.login("JOHN_DOE", "abc123!", true);
   */
  async login(username: string, password?: string, verify = false, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.login);

    if (browser.config && browser.config.params && browser.config.params.auth && browser.config.params.auth.formType === "skip") {
      util.console.warn("Login is skipped since 'formType' is set to 'skip'");
      return true;
    }

    ({ username, password } = this._getUsernameAndPassword(vl, username, password));

    let authenticator;
    let messageSelector;
    try {
      await browser.waitUntil(async function () {
        const fioriForm = new Promise<void>(async (res, rej) => {
          try {
            const fioriFormId = ui5.authenticators.fioriForm.formId;
            const elem = await nonUi5.element.getByCss(fioriFormId, 0, 500);
            await nonUi5.element.isVisible(elem);
            authenticator = ui5.authenticators.fioriForm;
            messageSelector = ui5.authenticators.fioriForm.messageSelector;
            res();
          } catch {
            rej();
          }
        });

        const sapCloudForm = new Promise<void>(async (res, rej) => {
          try {
            const sapCloudFormId = ui5.authenticators.sapCloudForm.formId;
            const elem = await nonUi5.element.getByCss(sapCloudFormId, 0, 500);
            await nonUi5.element.isVisible(elem);
            authenticator = ui5.authenticators.sapCloudForm;
            messageSelector = ui5.authenticators.sapCloudForm.messageSelector;
            res();
          } catch {
            rej();
          }
        });

        try {
          await Promise.any([fioriForm, sapCloudForm]);
          return true;
        } catch {
          return false;
        }
      }, timeout);
    } catch (error) {
      this.ErrorHandler.logException(error, "Could not find the login page within the given time.");
    }

    await this._loginWithUsernameAndPassword(username, password, authenticator, verify, messageSelector);
  }

  /**
   * @function loginFiori
   * @memberOf ui5.session
   * @description Login with fioriForm and specific username and password.
   * @param {String} username - The username.
   * @param {String} [password] - The password.
   * @param {Boolean} [verify=false] - Specifies if the function will check the shell header after logging in.
   * @example await ui5.session.loginFiori("john", "abc123!");
   */
  async loginFiori(username: string, password?: string, verify = false) {
    const vl = this.vlf.initLog(this.loginFiori);

    ({ username, password } = this._getUsernameAndPassword(vl, username, password));

    try {
      const authenticator = ui5.authenticators.fioriForm;
      const messageSelector = ui5.authenticators.fioriForm.messageSelector;
      return await this._loginWithUsernameAndPassword(username, password, authenticator, verify, messageSelector);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function loginSapCloud
   * @memberOf ui5.session
   * @description Login with sapCloud form and specific username and password.
   * @param {String} username - The username.
   * @param {String} [password] - The password.
   * @param {Boolean} [verify=false] - Specifies if the function will check the shell header after logging in.
   * @example await ui5.session.loginSapCloud("john", "abc123!");
   */
  async loginSapCloud(username: string, password?: string, verify = false) {
    const vl = this.vlf.initLog(this.loginSapCloud);

    ({ username, password } = this._getUsernameAndPassword(vl, username, password));

    try {
      const authenticator = await ui5.authenticators.sapCloudForm;
      const messageSelector = ui5.authenticators.sapCloudForm.messageSelector;
      return await this._loginWithUsernameAndPassword(username, password, authenticator, verify, messageSelector);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

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
  async loginCustom(username: string, password = "", usernameFieldSelector: string, passwordFieldSelector: string, logonButtonSelector: string, verify = false) {
    const vl = this.vlf.initLog(this.loginCustom);

    ({ username, password } = this._getUsernameAndPassword(vl, username, password));

    try {
      const authenticator = {
        usernameFieldSelector: usernameFieldSelector,
        passwordFieldSelector: passwordFieldSelector,
        logonButtonSelector: logonButtonSelector
      };
      return await this._loginWithUsernameAndPassword(username, password, authenticator, verify);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function loginCustomViaConfig
   * @memberOf ui5.session
   * @description Login with specific username and password. The selectors will be taken from the config.
   * @param {String} username - The username. Can be specified in spec or config. If specified in both credentials will be taken from config.
   * @param {String} [password] - The password. Can be specified in spec or config. If specified in both credentials will be taken from config.
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
  async loginCustomViaConfig(username: string, password?: string, verify = false) {
    const vl = this.vlf.initLog(this.loginCustomViaConfig);

    ({ username, password } = this._getUsernameAndPassword(vl, username, password));

    try {
      const baseUrl = browser.config.baseUrl;
      await browser.navigateTo(baseUrl);
      if (browser.config.params && browser.config.params.auth && browser.config.params.auth.username && browser.config.params.auth.password) {
        username = browser.config.params.auth.username;
        password = browser.config.params.auth.password;
      
        util.console.info("Login credentials will be taken from config.");
      } else if (!username && !password) {
        this.ErrorHandler.logException(new Error("Username or password is missing. Check your parameters or config file."));
      }
    } catch (error) {
      this.ErrorHandler.logException(error, "Please maintain the credentials in your config or spec.");
    }
    try {
      const authenticator = {
        usernameFieldSelector: browser.config.params.auth.usernameFieldSelector,
        passwordFieldSelector: browser.config.params.auth.passwordFieldSelector,
        logonButtonSelector: browser.config.params.auth.logonButtonSelector
      };
      return await this._loginWithUsernameAndPassword(username, password!, authenticator, verify);
    } catch (error) {
      this.ErrorHandler.logException(error, "Please maintain the auth values in your config.");
    }
  }

  // =================================== LOGOUT / SWITCH ===================================
  /**
   * @function logout
   * @memberOf ui5.session
   * @description Logs the user out.
   * @param {Boolean} [verify="true"] - Specifies if the function will check the logout text after logging out.
   * Set this to false if the system does not show the text after logging out.
   * @example await ui5.session.logout();
   */
  async logout(verify = true) {
    const vl = this.vlf.initLog(this.logout);

    if (browser.config && browser.config.params && browser.config.params.auth && browser.config.params.auth.formType === "skip") {
      util.console.warn("Logout is skipped since 'formType' is set to 'skip'");
      return await browser.reloadSession(); // Clean cache
    }

    await ui5.navigationBar.clickUserIcon();
    await this._clickSignOut();
    await ui5.confirmationDialog.clickOk();

    if (verify) {
      await ui5.session.expectLogoutText();
    }
  }

  /**
   * @function switchUser
   * @memberOf ui5.session
   * @description switches the user according to the passed username and password.
   * @param {String} username - The username.
   * @param {String} [password] - The password.
   * @param {Object} [authenticator] - The login form type. Set to null to use generic login.
   * @param {Number} [wait=10000] - The waiting time between logout and login (ms).
   * @example await ui5.session.switchUser("PURCHASER");
   * @example const authenticator = ui5.authenticators.fioriForm;
   * await ui5.session.switchUser("PURCHASER", "super-duper-sensitive-pw", authenticator, 30000);
   */
  async switchUser(username: string, password = "", authenticator: any, wait = 10000) {
    const vl = this.vlf.initLog(this.switchUser);

    ({ username, password } = this._getUsernameAndPassword(vl, username, password));

    await this.logout();
    await util.browser.sleep(wait);
    await browser.navigateTo(browser.config.baseUrl);
    if (!authenticator) {
      this.login(username, password);
    } else {
      await this._loginWithUsernameAndPassword(username, password, authenticator);
    }
  }

  // =================================== ASSERTION ===================================
  /**
   * @function expectLogoutText
   * @memberOf ui5.session
   * @description Expects the logout text after logout to be "You have been logged off.
   * This is essential for chaining scripts, so that no static browser sleep in the spec itself is required anymore.
   * @example await ui5.session.expectLogoutText();
   */
  async expectLogoutText() {
    const vl = this.vlf.initLog(this.expectLogoutText);
    const elem = await nonUi5.element.getById("msgText");
    await nonUi5.assertion.expectToBeVisible(elem);
  }

  // =================================== HELPER ===================================
  private async _loginWithUsernameAndPassword(username: string, password: string, authenticator = ui5.authenticators.fioriForm, verify = false, messageSelector?: string) {
    const vl = this.vlf.initLog(this._loginWithUsernameAndPassword);

    let usernameField = null;
    let passwordField = null;
    let logonField = null;
    try {
      await browser.waitUntil(
        async function () {
          usernameField = await $(authenticator.usernameFieldSelector);
          passwordField = await $(authenticator.passwordFieldSelector);
          logonField = await $(authenticator.logonButtonSelector);
          return (
            (await usernameField.isDisplayedInViewport()) &&
            (await passwordField.isDisplayedInViewport()) &&
            (await logonField.isDisplayedInViewport())
          );
        },
        {
          timeout: 30000,
          timeoutMsg: "Login failed: Login page with the given authenticator not present."
        }
      );

      // @ts-ignore
      await usernameField.setValue(username);
      // @ts-ignore
      await passwordField.setValue(password);
      // @ts-ignore
      await logonField.click();
    } catch (error) {
      this.ErrorHandler.logException(new Error("Please check if you are already logged in or if the system is down"));
    }

    if (messageSelector) {
      await this._checkForErrors(messageSelector);
    }

    if (verify) {
      await ui5.navigationBar.expectShellHeader();
    }
    try {
      await util.browser.logUI5Version();
    } catch (error) {
      if (error instanceof Error) {
        util.console.warn(error.toString());
      }
    }
    if (browser.config.params.applyS4UserSettings === true) {
      await flp.userSettings.setS4UserSettings(username, password);
    }
  }

  private async _clickSignOut(timeout = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this._clickSignOut);
    
    // attempt clicking both old and new logout buttons
    await browser.waitUntil(
      async () => {
        try {
          await Promise.any([scrollAndClickLogoutOld(), scrollAndClickLogoutNew()]);
          return true;
        } catch (error) {
          // Ignore error and continue to next promise
          return false;
        }
      },
      {
        timeout: timeout,
        timeoutMsg: "Sign out button not clickable",
        interval: 10
      }
    );

    async function scrollAndClickLogoutOld() {
      const selector = {
        elementProperties: {
          metadata: "sap.m.StandardListItem",
          mProperties: {
            id: "*logoutBtn"
          }
        }
      };
      await ui5.userInteraction.scrollToElement(selector, 0, "end", 500);
      await ui5.userInteraction.click(selector, 0, 500);
    }

    async function scrollAndClickLogoutNew() {
      // TODO: to remove '>>>' after support for v9 is implemented (v9 supports shadow root without '>>>')
      const selector = ">>>.ui5-user-menu-sign-out-btn";
      await nonUi5.userInteraction.scrollToElement(selector, "end", 500);
      await nonUi5.userInteraction.click(selector, 500);
    }
  }

  private async _checkForErrors(messageSelector: string) {
    const vl = this.vlf.initLog(this._checkForErrors);
    let uiErrorMessagesFound = false;
    let messageText;

    try {
      const messageDiv = await nonUi5.element.getByCss(messageSelector, 0, 3000);
      // @ts-ignore
      messageText = await nonUi5.element.getValue(messageDiv, "text");
      uiErrorMessagesFound = true;
    } catch (e) {
      // no error messages found in login
    }
    if (uiErrorMessagesFound) {
      throw new Error(`Login failed: "${messageText}"`);
    }
  }

  // Checks if username and password is defined as env var and will overwrite the passed user in that case.
  // Password is using fallback if default password is set as env var.
  private _getUsernameAndPassword(vl: InactiveLogger | ActiveLogger, username: string, password: string | undefined) {
    if (process.env.QMATE_SESSION_USERNAME) {
      vl.log("Using user from environment variable.");
      username = process.env.QMATE_SESSION_USERNAME;
    }
    if (!username) {
      this.ErrorHandler.logException(new Error("Please provide a valid username."));
    }

    if (process.env.QMATE_SESSION_PASSWORD) {
      vl.log("Using password from environment variable.");
      password = process.env.QMATE_SESSION_PASSWORD;
    }
    if (!password) {
      if (process.env.QMATE_DEFAULT_PASSWORD) {
        vl.log("Using default password from environment variable.");
        password = process.env.QMATE_DEFAULT_PASSWORD;
      } else {
        return this.ErrorHandler.logException(new Error("Password was not provided neither in method nor in env variable."));
      }
    }

    return { username, password };
  }
}
export default new Session();
