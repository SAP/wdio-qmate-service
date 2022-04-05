"use strict";
/**
 * @class navigationBar
 * @memberof ui5
 */
export class NavigationBar {

  /**
   * @function clickBack
   * @memberOf ui5.navigationBar
   * @description Navigates one layer back.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickBack();
   */
  async clickBack (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellHeadItem",
        "mProperties": {
          "id": "backBtn"
        }
      }
    };
    return ui5.userInteraction.click(selector, 0, timeout);
  };

  /**
   * @function clickSapLogo
   * @memberOf ui5.navigationBar
   * @description Clicks at the SAP Logo.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickSapLogo();
   */
  async clickSapLogo (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const selector = {
      "id": "shell-header-logo"
    };
    return ui5.userInteraction.click(selector, 0, timeout);
  };

  /**
   * @function clickUserIcon
   * @memberOf ui5.navigationBar
   * @description Clicks at the Account Icon.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickUserIcon();
   */
  async clickUserIcon (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const selector = {
      "elementProperties": {
        "id": "meAreaHeaderButton"
      }
    };
    return ui5.userInteraction.click(selector, 0, timeout);
  };


  // =================================== ASSERTION ===================================
  /**
   * @function expectPageTitle
   * @memberOf ui5.navigationBar
   * @description Expects the page title of the current page to be the compare value.
   * @param {String} compareValue - The compare value.
   * @example await ui5.navigationBar.expectPageTitle("Home");
   */
  async expectPageTitle (compareValue: string) {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellAppTitle",
        "mProperties": {
          "text": compareValue,
          "tooltip": [{
            "path": "i18n>shellNavMenu_openMenuTooltip"
          }]
        }
      }
    };
    try {
      await ui5.assertion.expectToBeVisibleInViewport(selector);
    } catch (error) {
      throw new Error(`Function 'expectPageTitle' failed:${error}`);
    }
  };

  /**
   * @function expectShellHeader
   * @memberOf ui5.navigationBar
   * @description Expects the shell header to be visible
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.expectShellHeader();
   */
  async expectShellHeader (timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = 10000) {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.ShellHeader",
        "id": "shell-header"
      }
    };
    return ui5.assertion.expectToBeVisible(selector, 0, timeout, loadPropertyTimeout);
  };

};
export default new NavigationBar();