"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

/**
 * @class navigationBar
 * @memberof ui5
 */
export class NavigationBar {
  private vlf = new VerboseLoggerFactory("ui5", "navigationBar");
  private ErrorHandler = new ErrorHandler();

  /**
   * @function clickBack
   * @memberOf ui5.navigationBar
   * @description Navigates one layer back.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickBack();
   */
  async clickBack(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.clickBack);
    const selector = {
      elementProperties: {
        metadata: "sap.ushell.ui.shell.ShellHeadItem",
        id: "backBtn"
      }
    };
    try {
      await ui5.userInteraction.click(selector, 0, timeout);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function clickSapLogo
   * @memberOf ui5.navigationBar
   * @description Clicks at the SAP Logo.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickSapLogo();
   */
  async clickSapLogo(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.clickSapLogo);
    const selector = {
      id: "shell-header-logo"
    };
    try {
      await ui5.userInteraction.click(selector, 0, timeout);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function clickUserIcon
   * @memberOf ui5.navigationBar
   * @description Clicks at the Account Icon.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickUserIcon();
   */
  async clickUserIcon(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.clickUserIcon);

    try {
      // attempt clicking both old and new user icons
      await Promise.any([clickUserIconOld(), clickUserIconNew()]);
    } catch (error) {
      (error as AggregateError).errors.forEach((err) => {
        this.ErrorHandler.logException(err);
      });
    }

    async function clickUserIconOld() {
      const selector = {
        "elementProperties": {
          "metadata": "sap.m.Avatar",
          "id": "*HeaderButton"
        }
      };
      await ui5.userInteraction.click(selector, 0, timeout);
    }

    async function clickUserIconNew() {
      // TODO: to remove '>>>' after support for v9 is implemented (v9 supports shadow root without '>>>')
      const selector = ">>>[data-ui5-stable='profile']";
      await nonUi5.userInteraction.click(selector);
    }
  }

  // =================================== ASSERTION ===================================
  /**
   * @function expectPageTitle
   * @memberOf ui5.navigationBar
   * @description Expects the page title of the current page to be the compare value.
   * @param {String} compareValue - The compare value.
   * @example await ui5.navigationBar.expectPageTitle("Home");
   */
  async expectPageTitle(compareValue: string) {
    const vl = this.vlf.initLog(this.expectPageTitle);
    const selector = {
      elementProperties: {
        metadata: "sap.ushell.ui.shell.ShellAppTitle",
        mProperties: {
          text: compareValue
        }
      }
    };
    try {
      await ui5.assertion.expectToBeVisibleInViewport(selector);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function expectShellHeader
   * @memberOf ui5.navigationBar
   * @description Expects the shell header to be visible
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.expectShellHeader();
   */
  async expectShellHeader(timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
    const vl = this.vlf.initLog(this.expectShellHeader);
    const selector = {
      elementProperties: {
        metadata: "sap.ushell.ui.ShellHeader",
        id: "shell-header"
      }
    };
    try {
      await ui5.assertion.expectToBeVisible(selector, 0, timeout, loadPropertyTimeout);
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }
}
export default new NavigationBar();
