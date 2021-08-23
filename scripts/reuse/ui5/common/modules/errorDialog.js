/**
 * @class errorDialog
 * @memberof ui5.common
 */
const ErrorDialog = function () {

  this.selectors = {
    errorDialog: {
      "elementProperties": {
        "metadata": "sap.m.Bar"
      },
      "ancestorProperties": {
        "metadata": "sap.m.Dialog",
        "icon": "sap-icon://error"
      }
    },
    closeButton: {
      "elementProperties": {
        "metadata": "sap.m.Button",
        "text": "Close"
      }
    }
  };

  /**
  * @function expectErrorDialogToBeVisible
  * @memberOf ui5.common.errorDialog
  * @description Expects that Error Dialog is visible on the page
  * @example await ui5.common.errorDialog.expectErrorDialogToBeVisible();
  */
  this.expectErrorDialogToBeVisible = async function () {
    await ui5.common.assertion.expectToBeVisible(this.selectors.errorDialog, 0, 2000);
  };

  /**
   * @function clickClose
   * @memberOf ui5.common.errorDialog
   * @description Clicks Close button in an Error dialog
   * @example await ui5.common.errorDialog.clickClose();
   */
  this.clickClose = async function () {
    await ui5.common.userInteraction.click(this.selectors.closeButton);
  };
};

module.exports = new ErrorDialog();
