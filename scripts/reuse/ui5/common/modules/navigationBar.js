/**
* @class navigationBar
* @memberof ui5.common
*/
const NavigationBar = function () {

  /**
   * @function clickBack
   * @memberOf ui5.common.navigationBar
   * @description Navigates one layer back.
   * @example await ui5.common.navigationBar.clickBack();
   */
  this.clickBack = async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellHeadItem",
        "mProperties": {
          "id": "backBtn"
        }
      }
    };
    await ui5.common.userInteraction.click(ui5ControlProperties);
  };

  /**
   * @function clickSapLogo
   * @memberOf ui5.common.navigationBar
   * @description Clicks at the SAP Logo.
   * @example await ui5.common.navigationBar.clickSapLogo();
   */
  this.clickSapLogo = async function () {
    const selector = {
      "id": "shell-header-logo"
    };
    return ui5.common.userInteraction.click(selector);
  };

  /**
   * @function clickUserIcon
   * @memberOf ui5.common.navigationBar
   * @description Clicks at the Account Icon.
   * @example await ui5.common.navigationBar.clickUserIcon();
   */
  this.clickUserIcon = async function () {
    const ui5ControlProperties = {
      "elementProperties": {
        "id": "meAreaHeaderButton"
      }
    };
    return ui5.common.userInteraction.click(ui5ControlProperties, 0, 90000);
  };

};
module.exports = new NavigationBar();
