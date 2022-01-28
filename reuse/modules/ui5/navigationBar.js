"use strict";
/**
 * @class navigationBar
 * @memberof ui5
 */
const NavigationBar = function () {

  /**
   * @function clickBack
   * @memberOf ui5.navigationBar
   * @description Navigates one layer back.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.navigationBar.clickBack();
   */
  this.clickBack = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
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
  this.clickSapLogo = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
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
  this.clickUserIcon = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
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
  this.expectPageTitle = async function (compareValue) {
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
<<<<<<< HEAD
  this.expectShellHeader = async function (timeout = browser.config.params.qmateCustomTimeout | 30000, loadPropertyTimeout = 10000) {
=======
  this.expectShellHeader = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 0) {
>>>>>>> origin/main
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.ShellHeader",
        "id": "shell-header"
      }
    };
    return ui5.assertion.expectToBeVisible(selector, 0, timeout, loadPropertyTimeout);
  };

};
module.exports = new NavigationBar();