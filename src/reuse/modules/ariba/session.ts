"use strict";

import { VerboseLoggerFactory, InactiveLogger, ActiveLogger } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class session
 * @memberof ariba
 */
export class Session {
  // Utils
  private _vlf = new VerboseLoggerFactory("ariba", "session");
  private _ErrorHandler = new ErrorHandler();

  // Selectors
  private _selectors = {
    usernameInput: "input[id='UserName']",
    passwordInput: "input[id='Password']",
    signInButton: "input[awname='loginButton']",
    testCentralLink: "//a[string()='Test Central']"
  };

  // Public
  async login(username: string, password: string, verify = false, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this._vlf.initLog(this.login);

    try {
      await this._fillUserName(username, timeout, vl);
      await this._fillPassword(password, timeout, vl);
      await this._clickSignIn(timeout, vl);

      if (verify) {
        await this._verifyLogin(timeout, vl);
      }
    } catch (error) {
      this._ErrorHandler.logException(error, "Failed to login.");
    }
  }

  async openTestCentral(verify = false, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this._vlf.initLog(this.openTestCentral);

    try {
      vl.log("Clicking 'Test Central' link");
      const elem = await nonUi5.element.getByCss(this._selectors.testCentralLink, 0, timeout);
      await nonUi5.userInteraction.click(elem);

      if (verify) {
        await this._verifyLoginToTestCentral(timeout, vl);
      }
    } catch (error) {
      this._ErrorHandler.logException(error, "Failed to open Test Central.");
    }
  }

  // Private
  private async _fillUserName(username: string, timeout: number, vl: InactiveLogger | ActiveLogger) {
    vl.log("Entering username");

    try {
      const elem = await nonUi5.element.getByCss(this._selectors.usernameInput, 0, timeout);
      await nonUi5.userInteraction.fill(elem, username);
    } catch (error) {
      this._ErrorHandler.logException(error, "Failed to enter the username.");
    }
  }

  private async _fillPassword(password: string, timeout: number, vl: InactiveLogger | ActiveLogger) {
    vl.log("Entering password");

    try {
      const elem = await nonUi5.element.getByCss(this._selectors.passwordInput, 0, timeout);
      await nonUi5.userInteraction.fill(elem, password);
    } catch (error) {
      this._ErrorHandler.logException(error, "Failed to enter the password.");
    }
  }

  private async _clickSignIn(timeout: number, vl: InactiveLogger | ActiveLogger) {
    vl.log("Clicking the sign in button");

    try {
      const elem = await nonUi5.element.getByCss(this._selectors.signInButton, 0, timeout);
      await nonUi5.userInteraction.click(elem);
    } catch (error) {
      this._ErrorHandler.logException(error, "Failed to click the sign in button.");
    }
  }

  private async _verifyLogin(timeout: number, vl: InactiveLogger | ActiveLogger) {
    vl.log("Verifying the login");

    try {
      const elem = await nonUi5.element.getByCss("TODO", 0, timeout);
      await nonUi5.assertion.expectToBeVisible(elem);
    } catch (error) {
      this._ErrorHandler.logException(error, "Failed to verify the login.");
    }
  }

  private async _verifyLoginToTestCentral(timeout: number, vl: InactiveLogger | ActiveLogger) {
    vl.log("Verifying the login to Test Central");

    try {
      const elem = await nonUi5.element.getByCss("TODO", 0, timeout);
      await nonUi5.assertion.expectToBeVisible(elem);
    } catch (error) {
      this._ErrorHandler.logException(error, "Failed to verify the login to Test Central.");
    }
  }
}
export default new Session();
