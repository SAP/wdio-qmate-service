"use strict";
/**
 * @class confirmationDialog
 * @memberof ui5
 */
const ConfirmationDialog = function () {

  this.selectors = {
    genericButton: (text) => {
      return {
        "elementProperties": {
          "metadata": "sap.m.Button",
          "mProperties": {
            "text": text
          }
        },
        "parentProperties": {
          "metadata": "sap.m.AssociativeOverflowToolbar"
        }
      };
    }
  };

  /**
   * @function clickButton
   * @memberOf ui5.confirmationDialog
   * @description Clicks the button with the given text at the confirmation dialog.
   * @param {Number} text - The text of the button.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.confirmationDialog.clickButton("Ok");
   */
  this.clickButton = async function (text, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    return ui5.userInteraction.click(this.selectors.genericButton(text), 0, timeout);
  };

  /**
   * @function clickOk
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "OK" button at the confirmation dialog.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.confirmationDialog.clickOk();
   */
  this.clickOk = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    return this.clickButton(/ok/gi, timeout);
  };

  /**
   * @function clickCancel
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Cancel" button at the confirmation dialog.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.confirmationDialog.clickCancel();
   */
  this.clickCancel = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    return this.clickButton("Cancel", timeout);
  };

  /**
   * @function clickYes
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Yes" button at the confirmation dialog.
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickYes();
   */
  this.clickYes = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    return this.clickButton("Yes", timeout);
  };

  /**
   * @function clickNo
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Yes" button at the confirmation dialog.
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickNo();
   */
  this.clickNo = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    return this.clickButton("No", timeout);
  };

  /**
   * @function clickCreate
   * @memberOf ui5.confirmationDialog
   * @description Clicks the create button in the confirmation dialog
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickCreate();
   */
  this.clickCreate = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    return this.clickButton("Create", timeout);
  };

  /**
   * @function clickDelete
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Delete" button at the confirmation dialog.
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickDelete();
   */
  this.clickDelete = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    return this.clickButton("Delete", timeout);
  };

  /**
   * @function clickRevokeApproval
   * @memberOf ui5.confirmationDialog
   * @description Clicks the "Revoke Approval" button at the confirmation dialog.
   * @param {Number} [timeout] - The timeout to wait (default value: 30 sec).
   * @example await ui5.confirmationDialog.clickRevokeApproval();
   */
  this.clickRevokeApproval = async function (timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    return this.clickButton("Revoke Approval", timeout);
  };

};
module.exports = new ConfirmationDialog();