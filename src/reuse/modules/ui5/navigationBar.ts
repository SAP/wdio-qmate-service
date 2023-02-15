"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class navigationBar
 * @memberof ui5
 */
export class NavigationBar {
  private vlf = new VerboseLoggerFactory("ui5", "navigationBar");

  /**
   * @function clickBack
   * @memberOf ui5.navigationBar
   * @description Navigates one layer back.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickBack();
   */
  async clickBack(timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
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
      throw new Error(`Function 'clickBack' failed: ${error}`);
    }
  }

  /**
   * @function clickSapLogo
   * @memberOf ui5.navigationBar
   * @description Clicks at the SAP Logo.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickSapLogo();
   */
  async clickSapLogo(timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const vl = this.vlf.initLog(this.clickSapLogo);
    const selector = {
      id: "shell-header-logo"
    };
    try {
      await ui5.userInteraction.click(selector, 0, timeout);
    } catch (error) {
      throw new Error(`Function 'clickSapLogo' failed: ${error}`);
    }
  }

  /**
   * @function clickUserIcon
   * @memberOf ui5.navigationBar
   * @description Clicks at the Account Icon.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickUserIcon();
   */
  async clickUserIcon(timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const vl = this.vlf.initLog(this.clickUserIcon);
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.Avatar",
        "id": "*HeaderButton"
      }
    };
    try {
      await ui5.userInteraction.click(selector, 0, timeout);
    } catch (error) {
      throw new Error(`Function 'clickUserIcon' failed: ${error}`);
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
      throw new Error(`Function 'expectPageTitle' failed: ${error}`);
    }
  }

  /**
   * @function expectShellHeader
   * @memberOf ui5.navigationBar
   * @description Expects the shell header to be visible
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.expectShellHeader();
   */
  async expectShellHeader(timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
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
      throw new Error(`Function 'expectPageTitle' failed: ${error}`);
    }
  }
}
export default new NavigationBar();
