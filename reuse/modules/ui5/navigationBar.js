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
  this.clickBack = async function (timeout = 30000) {
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
  this.clickSapLogo = async function (timeout = 30000) {
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
  this.clickUserIcon = async function (timeout = 30000) {
    const selector = {
      "elementProperties": {
        "id": "meAreaHeaderButton"
      }
    };
    return ui5.userInteraction.click(selector, 0, timeout);
  };

};
module.exports = new NavigationBar();